import path = require('path')
import fs = require('fs')
import { CaseStyle } from './case-style'
import log from './log'

export type Data = {
  [key: string]: {
    value?: string
    description?: string
    required?: boolean
    input?: boolean
    caseStyle?: CaseStyle
  }
}

export type Pattern = {
  dir: string
  caseStyle?: CaseStyle
  template: string
  data?: Data
}

export type Config = {
  root?: string
  patterns: {
    [k: string]: Pattern
  }
}

const cwd = process.cwd()
const config: Config = {
  patterns: {},
}

export function loadConfig(configFile?: string): void {
  const configPath = configFile
    ? path.resolve(configFile)
    : path.resolve(`.tpgenrc.json`)

  if (!fs.existsSync(configPath)) {
    log.error(
      `Could not load config file. The file ${configPath} does not exist`,
    )
  }

  const configRaw = fs.readFileSync(configPath)

  process.chdir(path.dirname(configPath))

  Object.assign(config, JSON.parse(configRaw.toString()))
}

export const exitConfig = (): void => {
  process.chdir(cwd)
}

export default config
