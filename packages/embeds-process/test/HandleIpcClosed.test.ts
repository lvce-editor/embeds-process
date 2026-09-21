import { afterEach, expect, jest, test } from '@jest/globals'
import * as ElectronWebContentsViewIpcState from '../src/parts/ElectronWebContentsViewIpcState/ElectronWebContentsViewIpcState.ts'
import * as HandleIpcClosed from '../src/parts/HandleIpcClosed/HandleIpcClosed.ts'

afterEach(() => {
  for (const [id] of ElectronWebContentsViewIpcState.getAll()) {
    ElectronWebContentsViewIpcState.remove(id)
  }
})

test('disposes all WebContentsViews owned by the closed ipc', async () => {
  const closedIpc = {}
  const openIpc = {}
  const closedRpc = { ipc: closedIpc }
  const openRpc = { ipc: openIpc }
  ElectronWebContentsViewIpcState.add(1, closedRpc)
  ElectronWebContentsViewIpcState.add(2, openRpc)
  ElectronWebContentsViewIpcState.add(3, closedRpc)
  const disposeWebContentsView = jest.fn<(id: number) => Promise<void>>().mockResolvedValue()

  await HandleIpcClosed.handleIpcClosed({ target: closedIpc }, disposeWebContentsView)

  expect(disposeWebContentsView).toHaveBeenCalledTimes(2)
  expect(disposeWebContentsView).toHaveBeenNthCalledWith(1, 1)
  expect(disposeWebContentsView).toHaveBeenNthCalledWith(2, 3)
  expect(ElectronWebContentsViewIpcState.getAll()).toEqual([['2', openRpc]])
})

test('hot reload detaches only the retiring connection and its late close preserves reattached views', async () => {
  const closedIpc = {}
  const closedRpc = { ipc: closedIpc, send: jest.fn() }
  const openRpc = { ipc: {}, send: jest.fn() }
  const replacementRpc = { ipc: {}, send: jest.fn() }
  ElectronWebContentsViewIpcState.add(1, closedRpc)
  ElectronWebContentsViewIpcState.add(2, openRpc)
  ElectronWebContentsViewIpcState.add(3, closedRpc)
  const disposeWebContentsView = jest.fn<(id: number) => Promise<void>>().mockResolvedValue()
  const ElectronWebContentsView = await import('../src/parts/ElectronWebContentsView/ElectronWebContentsView.ts')

  expect(ElectronWebContentsView.detachForHotReload(closedRpc)).toEqual([1, 3])
  expect(ElectronWebContentsView.detachForHotReload(closedRpc)).toEqual([])
  ElectronWebContentsView.handleAudioStateChanged(1, true)
  expect(closedRpc.send).not.toHaveBeenCalled()
  ElectronWebContentsViewIpcState.add(1, replacementRpc)
  ElectronWebContentsViewIpcState.add(3, replacementRpc)
  await HandleIpcClosed.handleIpcClosed({ target: closedIpc }, disposeWebContentsView)
  expect(disposeWebContentsView).not.toHaveBeenCalled()
  ElectronWebContentsView.handleAudioStateChanged(1, true)
  expect(replacementRpc.send).toHaveBeenCalledWith('ElectronWebContentsView.handleAudioStateChanged', 1, true)
  expect(ElectronWebContentsViewIpcState.get(2)).toBe(openRpc)

  await HandleIpcClosed.handleIpcClosed({ target: replacementRpc.ipc }, disposeWebContentsView)
  expect(disposeWebContentsView.mock.calls).toEqual([[1], [3]])
})
