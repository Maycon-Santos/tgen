import { Args, Command, Flags } from '@oclif/core'
import loadConfig from '../../utils/load-config'
import loadTemplate from '../../utils/load-template'
import { getCaseStyle, toCaseStyle } from '../../utils/case-style'
import path = require('path')
import fs = require('fs')

export default class Create extends Command {
  static flags = {
    dir: Flags.string({
      char: 'd',
      description:
        'Directory where the pattern will be inserted. The default is the root defined in the configuration file.',
      required: false,
    }),
    config: Flags.string({
      chat: 'c',
      description: '',
      required: false,
    }),
  }

  static args = {
    pattern: Args.string({
      get description() {
        const config = loadConfig()
        return `Available: ${Object.keys(config.patterns).join(', ')}`
      },
      required: true,
    }),
    name: Args.string({
      description: 'Name of the files to be generated.',
      required: true,
    }),
  }

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Create)
    const config = loadConfig(flags.config)
    const command = config.patterns[args.pattern]
    const template = loadTemplate(command.template, flags.config)
    const filesToWrite: { [k: string]: string } = {}

    for (const filename of Object.keys(template)) {
      const fileContent = template[filename]
      const pathToWrite = path
        .join(path.resolve(command.dir), flags.dir || '', filename)
        .replaceAll('[name]', path.basename(args.name))

      if (fs.existsSync(pathToWrite)) {
        throw new Error(`File ${pathToWrite} already exists.`)
      }

      if (!/^[\w .-]+$/.test(args.name)) {
        throw new Error(
          `File name is invalid (${args.name}). It can only contain letters, digits, underscores, hyphens, periods and spaces.`,
        )
      }

      filesToWrite[pathToWrite] = fileContent

      for (const replaceInFile of command.replaceInFile) {
        const {
          from,
          to: toRaw,
          caseStyle: caseStyleRaw,
          regexp,
        } = replaceInFile

        const caseStyle =
          caseStyleRaw || command.caseStyle || getCaseStyle(args.name)
        const to = toCaseStyle(
          toRaw.replaceAll('[name]', path.basename(args.name)),
          caseStyle,
        )

        if (regexp) {
          template[filename] = fileContent.replace(new RegExp(from), to)
          continue
        }

        template[filename] = fileContent.replaceAll(from, to)
      }

      filesToWrite[pathToWrite] = template[filename]
    }

    for (const pathToWrite of Object.keys(filesToWrite)) {
      if (!fs.existsSync(path.dirname(pathToWrite))) {
        fs.mkdirSync(path.dirname(pathToWrite), { recursive: true })
      }

      fs.writeFileSync(pathToWrite, filesToWrite[pathToWrite])
    }
  }
}
