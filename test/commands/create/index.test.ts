import { expect, test } from '@oclif/test'
import * as path from 'node:path'
import * as fs from 'node:fs'

const configPath = path.resolve('test/commands/create/.tgen/.config')

describe('create', () => {
  beforeEach(() => {
    if (fs.existsSync(path.resolve('./test/tmp'))) {
      fs.rmSync(path.resolve('./test/tmp'), { recursive: true })
    }
  })

  test
    .stdout()
    .command(['create', 'template-1', 'name-test', '--config', configPath])
    .it('generate template-1', () => {
      expect(fs.existsSync(path.resolve('./test/tmp/name-test/name-test.js')))
        .to.be.true
      expect(
        fs.existsSync(
          path.resolve('./test/tmp/name-test/name-test.module.css'),
        ),
      ).to.be.true
      expect(
        fs.existsSync(path.resolve('./test/tmp/name-test/name-test.test.js')),
      ).to.be.true
      expect(fs.existsSync(path.resolve('./test/tmp/name-test/index.js'))).to.be
        .true
    })

  test
    .stdout()
    .command([
      'create',
      'template-1',
      'name-test',
      '-d',
      'dir-test',
      '--config',
      configPath,
    ])
    .it('Generate template-1 in dir-test directory', () => {
      expect(
        fs.existsSync(
          path.resolve('./test/tmp/dir-test/name-test/name-test.js'),
        ),
      ).to.be.true
      expect(
        fs.existsSync(
          path.resolve('./test/tmp/dir-test/name-test/name-test.module.css'),
        ),
      ).to.be.true
      expect(
        fs.existsSync(
          path.resolve('./test/tmp/dir-test/name-test/name-test.test.js'),
        ),
      ).to.be.true
      expect(
        fs.existsSync(path.resolve('./test/tmp/dir-test/name-test/index.js')),
      ).to.be.true
    })

  test
    .stdout()
    .command(['create', 'template-1', 'name-test', '--config', configPath])
    .command(['create', 'template-1', 'name-test', '--config', configPath])
    .catch((error) => {
      expect(error.message).to.contain('File')
      expect(error.message).to.contain('already exists.')
    })
    .it('show an error when trying to generate a pre-existing file')

  test
    .stdout()
    .command(['create', 'template-1', 'name/@test', '--config', configPath])
    .catch((error) => {
      expect(error.message).to.contain(
        'File name is invalid (name/@test). It can only contain letters, digits, underscores, hyphens, periods and spaces.',
      )
    })
    .it('shows an error when trying to generate a file with an invalid name')

  test
    .stdout()
    .command(['create', 'template-2', 'name-test', '--config', configPath])
    .it('should replace text', () => {
      expect(
        fs.readFileSync(path.resolve('./test/tmp/.txt')).toString(),
      ).contain('NameTestReplaced or regex-replacement and regex-replacement')
    })

  test
    .stdout()
    .command(['create', 'template-3', 'name-test', '--config', configPath])
    .catch((error) => {
      expect(error.message).to.equal(
        'key `from`, `fromRegexp` or `to` not found in template replace.',
      )
    })
    .it(
      'shows an error when trying to generate a file with replace missing key `from`, `fromRegexp` or `to`',
    )
})
