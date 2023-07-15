import { createInterface } from 'node:readline'

export const readLineAsync = (msg: string): Promise<string> => {
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise((resolve) => {
    readline.question(msg, (userRes) => {
      resolve(userRes)
      readline.close()
    })
  })
}
