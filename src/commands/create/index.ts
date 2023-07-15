import path = require('path')
import fs = require('fs')
import { Args, Command, Flags } from '@oclif/core'
import config from '../../utils/config'
import parseTemplate from '../../utils/template'
import { toCaseStyle } from '../../utils/case-style'
import log from '../../utils/log'

export default class Create extends Command {
  static flags = {
    dir: Flags.string({
      char: 'd',
      description:
        'Directory where the pattern will be inserted. The default is the root defined in the configuration file.',
      required: false,
    }),
  }

  static args = {
    pattern: Args.string({
      description: '',
      required: true,
    }),
    name: Args.string({
      description: 'Name of the files to be generated.',
      required: true,
    }),
  }

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Create)
    const pattern = config.patterns[args.pattern]
    const template = await parseTemplate(
      pattern,
      toCaseStyle(args.name, pattern.caseStyle),
      flags.dir,
    )

    for (const pathToWrite of Object.keys(template)) {
      if (fs.existsSync(pathToWrite)) {
        log.error(`File ${pathToWrite} already exists.`)
      }

      if (!/^[\w .-]+$/.test(args.name)) {
        log.error(
          `File name is invalid (${args.name}). It can only contain letters, digits, underscores, hyphens, periods and spaces.`,
        )
      }
    }

    log.info('Generated files:')

    for (const pathToWrite of Object.keys(template)) {
      if (!fs.existsSync(path.dirname(pathToWrite))) {
        fs.mkdirSync(path.dirname(pathToWrite), { recursive: true })
      }

      fs.writeFileSync(pathToWrite, template[pathToWrite])

      log.soft(`${pathToWrite}`)
    }
  }
}
