import fs = require('fs')
import path = require('path')

type Template = {
  [filename: string]: string
}

const loadTemplate = (templateName: string, configFile?: string): Template => {
  const configDir = path.dirname(
    configFile ? path.resolve(configFile) : path.resolve(`./.tgen/.config`),
  )
  const template: Template = {}
  const templateDir = path.join(configDir, templateName)

  function run(dir: string) {
    const files = fs.readdirSync(dir)

    for (const filename of files) {
      const filePath = path.join(dir, filename)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        run(filePath)
        continue
      }

      const fileContent = fs.readFileSync(filePath)
      template[filePath.replace(templateDir, '')] = fileContent.toString()
    }
  }

  run(templateDir)

  return template
}

export default loadTemplate
