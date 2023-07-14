import path = require('path')
import fs = require('fs')
import { Args, Command, Flags } from '@oclif/core'
import loadConfig, { Pattern } from '../../utils/config'
import loadTemplate from '../../utils/template'
import { getCaseStyle, toCaseStyle } from '../../utils/case-style'
import log from '../../utils/log'

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
      description: '',
      required: true,
    }),
    name: Args.string({
      description: 'Name of the files to be generated.',
      required: true,
    }),
  }

  private makeReplaces(
    pattern: Pattern,
    name: string,
    content: string,
  ): string {
    let contentWithReplacements = content

    for (const replace of pattern.replace) {
      const { from, to: toRaw, caseStyle: caseStyleRaw, fromRegexp } = replace
      const caseStyle = caseStyleRaw || getCaseStyle(name)
      const to = toCaseStyle(
        toRaw.replaceAll('[name]', path.basename(name)),
        caseStyle,
      )

      if (fromRegexp && to) {
        contentWithReplacements = contentWithReplacements.replace(
          new RegExp(...fromRegexp),
          to,
        )
        continue
      }

      if (from && to) {
        contentWithReplacements = contentWithReplacements.replaceAll(from, to)
        continue
      }

      log.error(
        'key `from`, `fromRegexp` or `to` not found in template replace.',
      )
    }

    return contentWithReplacements
  }

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Create)
    const config = loadConfig(flags.config)
    const pattern = config.patterns[args.pattern]
    const template = loadTemplate(pattern, args.name, config.root, flags.dir)

    const filesToWrite: { [k: string]: string } = {}

    for (const pathToWrite of Object.keys(template)) {
      const fileContent = template[pathToWrite]

      if (fs.existsSync(pathToWrite)) {
        log.error(`File ${pathToWrite} already exists.`)
      }

      if (!/^[\w .-]+$/.test(args.name)) {
        log.error(
          `File name is invalid (${args.name}). It can only contain letters, digits, underscores, hyphens, periods and spaces.`,
        )
      }

      filesToWrite[pathToWrite] = this.makeReplaces(
        pattern,
        args.name,
        fileContent,
      )
    }

    log.info('Generated files:')

    for (const pathToWrite of Object.keys(filesToWrite)) {
      if (!fs.existsSync(path.dirname(pathToWrite))) {
        fs.mkdirSync(path.dirname(pathToWrite), { recursive: true })
      }

      fs.writeFileSync(pathToWrite, filesToWrite[pathToWrite])

      log.soft(`${pathToWrite}`)
    }
  }
}
