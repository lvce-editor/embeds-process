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
  ElectronWebContentsViewIpcState.add(1, closedIpc)
  ElectronWebContentsViewIpcState.add(2, openIpc)
  ElectronWebContentsViewIpcState.add(3, closedIpc)
  const disposeWebContentsView = jest.fn<(id: number) => Promise<void>>().mockResolvedValue()

  await HandleIpcClosed.handleIpcClosed({ target: closedIpc }, disposeWebContentsView)

  expect(disposeWebContentsView).toHaveBeenCalledTimes(2)
  expect(disposeWebContentsView).toHaveBeenNthCalledWith(1, 1)
  expect(disposeWebContentsView).toHaveBeenNthCalledWith(2, 3)
  expect(ElectronWebContentsViewIpcState.getAll()).toEqual([['2', openIpc]])
})
