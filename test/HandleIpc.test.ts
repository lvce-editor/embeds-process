import { expect, jest, test } from '@jest/globals'
import * as HandleIpc from '../src/parts/HandleIpc/HandleIpc.js'
import * as HandleMessage from '../src/parts/HandleMessage/HandleMessage.js'


test('commandMap', () => {
  const ipc = {
    addEventListener: jest.fn()
  }
  HandleIpc.handleIpc(ipc)
  expect(ipc.addEventListener).toHaveBeenCalledTimes(1)
  expect(ipc.addEventListener).toHaveBeenCalledWith('message', HandleMessage.handleMessage)
})
