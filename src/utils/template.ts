import fs = require('fs')
import path = require('path')
import { Pattern } from './config'
import { toCaseStyle } from './case-style'

export type Template = {
  [filename: string]: string
}

const loadTemplate = (
  pattern: Pattern,
  name: string,
  rootDir?: string,
  dir?: string,
): Template => {
  const template: Template = {}
  const templateDir = pattern.template

  function run(currentDir: string) {
    const files = fs.readdirSync(currentDir)

    for (const filename of files) {
      const filePath = path.join(currentDir, filename)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        run(filePath)
        continue
      }

      const replaceNameFrom = '[name]'
      const replaceNameTo = pattern.caseStyle
        ? toCaseStyle(path.basename(name), pattern.caseStyle)
        : path.basename(name)

      const fileContentWithReplacements = filePath
        .replace(templateDir, '')
        .replaceAll(replaceNameFrom, replaceNameTo)

      const fileContent = fs.readFileSync(filePath)
      template[fileContentWithReplacements] = fileContent.toString()
    }
  }

  run(templateDir)

  return resolvePath(template, pattern, rootDir, dir)
}

function resolvePath(
  template: Template,
  pattern: Pattern,
  rootDir?: string,
  dir?: string,
) {
  const templateEntries = Object.entries(template)

  return Object.fromEntries(
    templateEntries.map(([filename, fileContent]) => {
      const pathToWrite = path.resolve(
        path.join(rootDir || '', pattern.dir, dir || '', filename),
      )

      return [pathToWrite, fileContent]
    }),
  )
}

export default loadTemplate
