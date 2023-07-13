import path = require('path')
import fs = require('fs')
import { CaseStyle } from './case-style'

export type Config = {
  patterns: {
    [k: string]: {
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
  }
}

const loadConfig = (configFile?: string): Config => {
  const configPath = configFile
    ? path.resolve(configFile)
    : path.resolve(`./.tgen/.config`)

  try {
    const configRaw = fs.readFileSync(configPath)
    return JSON.parse(configRaw.toString())
  } catch {
    throw new Error('Could not load .config.')
  }
}

export default loadConfig
