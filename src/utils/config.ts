import path = require('path')
import fs = require('fs')
import { CaseStyle } from './case-style'

export type Pattern = {
  dir: string
  caseStyle?: CaseStyle
  template: string
  replace: [
    {
      caseStyle?: CaseStyle
      from?: string
      fromRegexp?: [string, string]
      to: string
    },
  ]
}

export type Config = {
  root?: string
  patterns: {
    [k: string]: Pattern
  }
}

const loadConfig = (configFile?: string): Config => {
  const configPath = configFile
    ? path.resolve(configFile)
    : path.resolve(`./.tgen/.config`)

  if (!fs.existsSync(configPath)) {
    throw new Error(
      `Could not load config file. The file ${configPath} does not exist`,
    )
  }

  const configRaw = fs.readFileSync(configPath)

  process.chdir(path.dirname(configPath))

  return JSON.parse(configRaw.toString())
}

export default loadConfig
