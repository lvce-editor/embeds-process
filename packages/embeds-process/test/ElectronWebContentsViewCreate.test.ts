import { beforeEach, expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as ElectronWebContentsView from '../src/parts/ElectronWebContentsView/ElectronWebContentsView.ts'
import * as ElectronWebContentsViewIpcState from '../src/parts/ElectronWebContentsViewIpcState/ElectronWebContentsViewIpcState.ts'
import * as MainProcess from '../src/parts/MainProcess/MainProcess.ts'

const invoke = jest.fn<(...args: any[]) => Promise<any>>()
MainProcess.set(MockRpc.create({ commandMap: {}, invoke }))

beforeEach(() => {
  invoke.mockReset()
  invoke.mockResolvedValue(42)
  ElectronWebContentsViewIpcState.remove(42)
})

test('forwards the requesting window and registers the resulting native view with its renderer', async () => {
  await expect(ElectronWebContentsView.createWebContentsView(3, 0, [], 7)).resolves.toBe(42)
  expect(invoke).toHaveBeenNthCalledWith(1, 'ElectronWebContentsView.createWebContentsView', 0, 7)
  expect(ElectronWebContentsViewIpcState.get(42)).toBe(3)
})

test('retains compatibility with callers that do not supply a window', async () => {
  await expect(ElectronWebContentsView.createWebContentsView(3, 0, [])).resolves.toBe(42)
  expect(invoke).toHaveBeenNthCalledWith(1, 'ElectronWebContentsView.createWebContentsView', 0, 0)
})

test('does not register a native view when its owner has closed', async () => {
  invoke.mockRejectedValueOnce(new Error('window is closed'))
  await expect(ElectronWebContentsView.createWebContentsView(3, 0, [], 7)).rejects.toThrow('window is closed')
  expect(invoke).toHaveBeenCalledTimes(1)
  expect(ElectronWebContentsViewIpcState.get(42)).toBeUndefined()
})
