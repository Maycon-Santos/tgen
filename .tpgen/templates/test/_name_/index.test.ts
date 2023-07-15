import { expect, test } from '@oclif/test'

describe('command - _command_', () => {
  test
    .stdout()
    .command(['_command_'])
    .it('runs _command_ cmd', (ctx) => {
      expect(ctx.stdout).to.contain('')
    })
})
