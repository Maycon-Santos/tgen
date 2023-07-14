import { assert } from 'chai'
import { expect } from '@oclif/test'
import * as path from 'node:path'
import loadConfig from '../../src/utils/config'

describe('utils - config', () => {
  it('load config file', () => {
    expect(
      typeof loadConfig(path.resolve('test/commands/create/.tgen/.config')),
    ).to.equal('object')
  })

  it('shows an error when the config path does not exist', () => {
    assert.throws(
      () => loadConfig('fake/path/.config'),
      Error,
      'Could not load config file.',
    )
  })
})
