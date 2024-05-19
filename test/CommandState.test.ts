import * as CommandState from '../src/parts/CommandState/CommandState.js'
import { test, expect, beforeEach } from '@jest/globals'

beforeEach(() => {
  CommandState.reset()
})

test('registerCommand', () => {
  const fn = () => { }
  CommandState.registerCommand('a', fn)
  expect(CommandState.getCommand('a')).toBe(fn)
})

test('registerCommands', () => {
  const fn = () => { }
  CommandState.registerCommands({
    'a': fn,
    'b': fn
  })
  expect(CommandState.getCommand('a')).toBe(fn)
  expect(CommandState.getCommand('b')).toBe(fn)
})
