import { beforeEach, expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as ElectronWebContentsView from '../src/parts/ElectronWebContentsView/ElectronWebContentsView.ts'
import * as MainProcess from '../src/parts/MainProcess/MainProcess.ts'

const state: { invocations: readonly any[][] } = {
  invocations: [],
}

const mockRpc = MockRpc.create({
  commandMap: {},
  invoke: async (method: string, ...args: readonly any[]) => {
    state.invocations = [...state.invocations, [method, ...args]]
    if (method === 'ElectronWebContentsViewFunctions.capturePage') {
      return 'data:image/png;base64,c25hcHNob3Q='
    }
    return undefined
  },
})

MainProcess.set(mockRpc)

beforeEach(() => {
  state.invocations = []
})

test('capturePage forwards to the main process', async () => {
  await expect(ElectronWebContentsView.capturePage(12)).resolves.toBe('data:image/png;base64,c25hcHNob3Q=')
  expect(state.invocations).toEqual([['ElectronWebContentsViewFunctions.capturePage', 12]])
})

test('hide forwards to the main process', async () => {
  await ElectronWebContentsView.hide(12)

  expect(state.invocations).toEqual([['ElectronWebContentsViewFunctions.hide', 12]])
})

test('acceptLogin forwards credentials to the main process', async () => {
  await ElectronWebContentsView.acceptLogin('12:1', 'admin', 'secret')

  expect(state.invocations).toEqual([['ElectronWebContentsView.acceptLogin', '12:1', 'admin', 'secret']])
})

test('cancelLogin forwards the challenge to the main process', async () => {
  await ElectronWebContentsView.cancelLogin('12:1')

  expect(state.invocations).toEqual([['ElectronWebContentsView.cancelLogin', '12:1']])
})
