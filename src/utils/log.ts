const log = {
  soft: (...values: string[]): void => {
    process.stdout.write(`${colorize(90, values.join(' '))}\n`)
  },
  warn: (...values: string[]): void => {
    process.stdout.write(`${colorize(33, ['Warn:', ...values].join(' '))}\n`)
  },
  error: (...values: string[]): void => {
    process.stdout.write('\u001B[91m')
    throw new Error(values.join(' '))
  },
  info: (...values: string[]): void => {
    process.stdout.write(`${values.join(' ')}\n`)
  },
  success: (...values: string[]): void => {
    process.stdout.write(`${colorize(92, values.join(' '))}\n`)
  },
}

export function colorize(color: number, output: string): string {
  return `\u001B[${color}m${output}\u001B[0m`
}

export default log
