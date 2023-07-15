import 'dotenv/config'
import { Flags, Hook } from '@oclif/core'
import { loadConfig } from '../utils/config'

const hook: Hook<'prerun'> = async function (ctx) {
  ctx.Command.flags.config = Flags.string({
    chat: 'c',
    description: '',
    required: false,
  })

  const configArgIndex = ctx.argv.findIndex(
    (value) => value === '-c' || value === '--config',
  )

  loadConfig(configArgIndex >= 0 ? ctx.argv[configArgIndex + 1] : undefined)
}

export default hook
