import fs = require('fs')
import path = require('path')
import Mustache = require('mustache')
import type { OpeningAndClosingTags } from 'mustache'
import config, { Pattern } from './config'
import { parseData } from './data'

export type Template = {
  [filename: string]: string
}

export const tags: OpeningAndClosingTags = ['_', '_']

async function parseTemplate(
  pattern: Pattern,
  name: string,
  dir?: string,
): Promise<Template> {
  const template: Template = {}
  const templateDir = pattern.template
  const data = await parseData(pattern, { name }, tags)

  function run(currentDir: string) {
    const files = fs.readdirSync(currentDir)

    for (const filename of files) {
      const filePath = path.join(currentDir, filename)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        run(filePath)
        continue
      }

      const fileContent = fs.readFileSync(filePath)

      const templateKey = Mustache.render(
        filePath.replace(templateDir, ''),
        data,
        {},
        { tags },
      )

      const templateContent = Mustache.render(
        fileContent.toString(),
        data,
        {},
        { tags },
      )

      template[templateKey] = templateContent
    }
  }

  run(templateDir)

  return resolvePath(template, pattern, dir)
}

function resolvePath(template: Template, pattern: Pattern, dir?: string) {
  const templateEntries = Object.entries(template)

  return Object.fromEntries(
    templateEntries.map(([filename, fileContent]) => {
      const pathToWrite = path.resolve(
        path.join(config.root || '', pattern.dir, dir || '', filename),
      )

      return [pathToWrite, fileContent]
    }),
  )
}

export default parseTemplate
