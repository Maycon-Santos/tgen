import { expect, test } from '@oclif/test'

describe('command - [command]', () => {
  test
    .stdout()
    .command(['[command]'])
    .it('runs [command] cmd', (ctx) => {
      expect(ctx.stdout).to.contain('')
    })
})
