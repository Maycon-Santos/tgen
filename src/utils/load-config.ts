import path = require('path')
import fs = require('fs')
import { CaseStyle } from './case-style'

type Config = {
  patterns: {
    [k: string]: {
      dir: string
      caseStyle?: CaseStyle
      template: string
      replaceInFile: {
        regexp?: boolean
        caseStyle?: CaseStyle
        from: string
        to: string
      }[]
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
