import Mustache = require('mustache')
import type { OpeningAndClosingTags } from 'mustache'
import { Pattern } from './config'
import { readLineAsync } from './read-line'
import log, { colorize } from './log'
import { toCaseStyle } from './case-style'

type Data = { [k: string]: string | number }

export async function parseData(
  pattern: Pattern,
  initialData: Data,
  tags: OpeningAndClosingTags,
): Promise<Data> {
  const data: Data = initialData

  if (pattern.data) {
    const dataKeys = Object.keys(pattern.data)

    for (let i = 0; i < dataKeys.length; i++) {
      const key = dataKeys[i]
      const { caseStyle, input, required, description } = pattern.data[key]
      let value = pattern.data?.[key].value

      if (value) {
        value = toCaseStyle(
          Mustache.render(value, data, {}, { tags }),
          caseStyle,
        )
      }

      if (input) {
        value = process.env[key]
          ? process.env[key]
          : await readLineAsync(
              `${description || key}: ${
                value ? colorize(90, `(${value})`) : ''
              } `,
            )

        if (!value) {
          value = pattern.data?.[key].value
        }

        if (!value && required) {
          i -= 1
          continue
        }
      }

      if (required && !value) {
        log.error(`${key} is required.`)
      }

      value = Mustache.render(value || '', data, {}, { tags })

      data[key] = caseStyle ? toCaseStyle(value, caseStyle) : value
    }
  }

  return data
}
