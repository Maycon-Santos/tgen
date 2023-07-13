import { assert } from 'chai'
import { expect } from '@oclif/test'
import loadConfig from '../../src/utils/load-config'

describe('utils - load-config', () => {
  it('load config file', () => {
    expect(typeof loadConfig('test/commands/create/.tgen/.config')).to.equal(
      'object',
    )
  })

  it('shows an error when the config path does not exist', () => {
    assert.throws(
      () => loadConfig('fake/path/.config'),
      Error,
      'Could not load config file.',
    )
  })
})
