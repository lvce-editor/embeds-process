import { expect, test } from '@jest/globals'
import * as HandleIpcSharedProcess from '../src/parts/HandleIpcSharedProcess/HandleIpcSharedProcess.ts'

test('upgradeMessagePort', () => {
  expect(HandleIpcSharedProcess.upgradeMessagePort()).toEqual({
    type: 'handle',
  })
})
