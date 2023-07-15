export type CaseStyle = 'camel' | 'pascal' | 'kebab' | 'snake'

export function toCaseStyle(value: string, caseStyle?: CaseStyle): string {
  if (!caseStyle) {
    return value
  }

  const fragments = toKebabStyle(value).split('-')

  switch (caseStyle) {
    case 'camel':
      return fragments
        .map((fragment, index) => (index > 0 ? capitalize(fragment) : fragment))
        .join('')
    case 'pascal':
      return fragments.map((fragment) => capitalize(fragment)).join('')
    case 'snake':
      return fragments.join('_')
    default:
      return fragments.join('-')
  }
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function getCaseStyle(value: string): CaseStyle {
  switch (true) {
    case isKebab(value):
      return 'kebab'
    case isSnake(value):
      return 'snake'
    case isPascal(value):
      return 'pascal'
    case isCamel(value):
    default:
      return 'camel'
  }
}

export function toKebabStyle(value: string): string {
  if (isSnake(value)) {
    return value.replaceAll('_', '-').toLowerCase()
  }

  if (isPascal(value) || isCamel(value)) {
    return value
      .replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? '-' : '') + $)
      .toLowerCase()
  }

  return value.toLowerCase()
}

function isCamel(value: string): boolean {
  return /(^[a-z]|[\dA-Z])[a-z]*/.test(value)
}

function isPascal(value: string): boolean {
  return /[A-Z]([\dA-Z]*[a-z][\da-z]*[A-Z]|[\da-z]*[A-Z][\dA-Z]*[a-z])[\dA-Za-z]*/.test(
    value,
  )
}

function isKebab(value: string): boolean {
  return /(\w+)-(\w)([\w-]*)/.test(value)
}

function isSnake(value: string): boolean {
  return /(\w+)_(\w)(\w*)/.test(value)
}
