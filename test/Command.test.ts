import { beforeEach, expect, test } from '@jest/globals'
import * as Command from '../src/parts/Command/Command.js'
import * as CommandState from '../src/parts/CommandState/CommandState.js'

beforeEach(() => {
  CommandState.reset()
})

test('execute - error - not found', () => {
  expect(
    () => Command.execute('a')
  ).toThrow(new Error('Command not found a'))
})

test('execute', async () => {
  const fn = () => {
    return 1
  }
  CommandState.registerCommand('a', fn)
  expect(
    await Command.execute('a')
  ).toBe(1)
})
