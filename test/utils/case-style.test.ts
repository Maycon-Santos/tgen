import { expect } from '@oclif/test'
import {
  getCaseStyle,
  toCaseStyle,
  toKebabStyle,
} from '../../src/utils/case-style'

describe('utils - case-style', () => {
  it('getCaseStyle - get case style of string', () => {
    expect(getCaseStyle('kebab-case')).to.equal('kebab')
    expect(getCaseStyle('snake_case')).to.equal('snake')
    expect(getCaseStyle('PascalCase')).to.equal('pascal')
    expect(getCaseStyle('camelCase')).to.equal('camel')
  })

  it('toKebabStyle - convert any case to kebab case', () => {
    expect(toKebabStyle('camelCase')).to.equal('camel-case')
    expect(toKebabStyle('PascalCase')).to.equal('pascal-case')
    expect(toKebabStyle('snake_case')).to.equal('snake-case')
  })

  it('toCaseStyle - convert any case to camel case', () => {
    expect(toCaseStyle('kebab-case', 'camel')).to.equal('kebabCase')
    expect(toCaseStyle('snake_case', 'camel')).to.equal('snakeCase')
    expect(toCaseStyle('PascalCase', 'camel')).to.equal('pascalCase')
  })

  it('toCaseStyle - convert any case to pascal case', () => {
    expect(toCaseStyle('kebab-case', 'pascal')).to.equal('KebabCase')
    expect(toCaseStyle('snake_case', 'pascal')).to.equal('SnakeCase')
    expect(toCaseStyle('camelCase', 'pascal')).to.equal('CamelCase')
  })

  it('toCaseStyle - convert any case to snake case', () => {
    expect(toCaseStyle('kebab-case', 'snake')).to.equal('kebab_case')
    expect(toCaseStyle('PascalCase', 'snake')).to.equal('pascal_case')
    expect(toCaseStyle('camelCase', 'snake')).to.equal('camel_case')
  })

  it('toCaseStyle - convert any case to kebab case', () => {
    expect(toCaseStyle('snake_case', 'kebab')).to.equal('snake-case')
    expect(toCaseStyle('PascalCase', 'kebab')).to.equal('pascal-case')
    expect(toCaseStyle('camelCase', 'kebab')).to.equal('camel-case')
  })
})
