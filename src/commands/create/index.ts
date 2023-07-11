import { Args, Command, Flags } from '@oclif/core'
import loadConfig from '../../utils/load-config'
import loadTemplate from '../../utils/load-template'
import { getCaseStyle, toCaseStyle } from '../../utils/case-style'
import path = require('path')
import fs = require('fs')

export default class Create extends Command {
  static flags = {
    name: Flags.string({
      char: 'n',
      description: '',
      required: true,
    }),
    dir: Flags.string({
      char: 'd',
      description: '',
      required: false,
    }),
  }

  static args = {
    space: Args.string({
      description: 'Space to generate',
      required: true,
    }),
  }

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Create)
    const config = loadConfig()
    const command = config.commands[args.space]
    const template = loadTemplate(command.template)
    const filesToWrite: { [k: string]: string } = {}

    for (const filename of Object.keys(template)) {
      const fileContent = template[filename]
      const pathToWrite = path
        .join(path.resolve(command.dir), flags.dir || '', filename)
        .replaceAll('[name]', path.basename(flags.name))

      if (fs.existsSync(pathToWrite)) {
        throw new Error(`File ${pathToWrite} already exists.`)
      }

      if (!/^[\w .-]+$/.test(flags.name)) {
        throw new Error(
          `File name is invalid (${flags.name}). It can only contain letters, digits, underscores, hyphens, periods and spaces.`,
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
          caseStyleRaw || command.caseStyle || getCaseStyle(flags.name)
        const to = toCaseStyle(
          toRaw.replaceAll('[name]', path.basename(flags.name)),
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
