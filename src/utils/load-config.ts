import path = require('path')
import fs = require('fs')
import { CaseStyle } from './case-style'

type Config = {
  commands: {
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

const loadConfig = (): Config => {
  try {
    const configRaw = fs.readFileSync(path.resolve(`./.tgen/.config`))
    return JSON.parse(configRaw.toString())
  } catch {
    throw new Error('Could not load .config.')
  }
}

export default loadConfig
