import { beforeEach, expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as ElectronWebContentsView from '../src/parts/ElectronWebContentsView/ElectronWebContentsView.ts'
import * as ElectronWebContentsViewIpcState from '../src/parts/ElectronWebContentsViewIpcState/ElectronWebContentsViewIpcState.ts'
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

test('insertJavaScript forwards the user gesture flag to the main process', async () => {
  await ElectronWebContentsView.insertJavaScript(12, 'play()', true)

  expect(state.invocations).toEqual([['ElectronWebContentsViewFunctions.insertJavaScript', 12, 'play()', true]])
})

test('click forwards the selector to the main process', async () => {
  await ElectronWebContentsView.click(12, '.playButton')

  expect(state.invocations).toEqual([['ElectronWebContentsViewFunctions.click', 12, '.playButton']])
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

test('favicon updates are forwarded with the web contents id', () => {
  const send = jest.fn()
  ElectronWebContentsViewIpcState.add(12, { send })

  ElectronWebContentsView.handlePageFaviconUpdated(12, ['https://example.com/favicon.png'])

  expect(send).toHaveBeenCalledWith('ElectronWebContentsView.handlePageFaviconUpdated', 12, ['https://example.com/favicon.png'])
  ElectronWebContentsViewIpcState.remove(12)
})

test('audio state changes are forwarded with the web contents id', () => {
  const send = jest.fn()
  ElectronWebContentsViewIpcState.add(12, { send })

  ElectronWebContentsView.handleAudioStateChanged(12, true)

  expect(send).toHaveBeenCalledWith('ElectronWebContentsView.handleAudioStateChanged', 12, true)
  ElectronWebContentsViewIpcState.remove(12)
})

test('window open events associate and forward the child web contents id', () => {
  const send = jest.fn()
  ElectronWebContentsViewIpcState.add(12, { send })

  ElectronWebContentsView.handleWindowOpen(12, 13, 'https://example.com/docs', 'foreground-tab')

  expect(send).toHaveBeenCalledWith('ElectronWebContentsView.handleWindowOpen', 12, 13, 'https://example.com/docs', 'foreground-tab')
  expect(ElectronWebContentsViewIpcState.get(13)).toEqual({ send })
  ElectronWebContentsViewIpcState.remove(12)
  ElectronWebContentsViewIpcState.remove(13)
})

test('destroyed events are forwarded and remove the web contents association', () => {
  const send = jest.fn()
  ElectronWebContentsViewIpcState.add(13, { send })

  ElectronWebContentsView.handleBrowserViewDestroyed(13)

  expect(send).toHaveBeenCalledWith('ElectronWebContentsView.handleBrowserViewDestroyed', 13)
  expect(ElectronWebContentsViewIpcState.get(13)).toBeUndefined()
})

test('keybindings are forwarded with the web contents id', () => {
  const send = jest.fn()
  ElectronWebContentsViewIpcState.add(12, { send })

  ElectronWebContentsView.handleKeyBinding(12, 2050)

  expect(send).toHaveBeenCalledWith('ElectronWebContentsView.handleKeyBinding', 12, 2050)
  ElectronWebContentsViewIpcState.remove(12)
})

test('fallthrough keybindings are forwarded to the main process', async () => {
  await ElectronWebContentsView.setFallthroughKeyBindings(12, [2050, 3074])

  expect(state.invocations).toEqual([['ElectronWebContentsViewFunctions.setFallthroughKeyBindings', 12, [2050, 3074]]])
})

test('setAudioMuted forwards the audio state to the main process', async () => {
  await ElectronWebContentsView.setAudioMuted(12, true)

  expect(state.invocations).toEqual([['ElectronWebContentsViewFunctions.setAudioMuted', 12, true]])
})

test('setZoomLevel forwards the zoom level to the embedded web contents', async () => {
  await ElectronWebContentsView.setZoomLevel(12, 0.5)

  expect(state.invocations).toEqual([['ElectronWebContents.callFunction', 12, 'setZoomLevel', 0.5]])
})

test('toggleDevTools toggles developer tools for the embedded web contents', async () => {
  await ElectronWebContentsView.toggleDevTools(12)

  expect(state.invocations).toEqual([['ElectronWebContents.callFunction', 12, 'toggleDevTools']])
})

test('pressKey forwards native key input to the main process', async () => {
  await ElectronWebContentsView.pressKey(12, 'L', ['shift'])
  expect(state.invocations).toEqual([['ElectronWebContentsViewFunctions.pressKey', 12, 'L', ['shift']]])
})

test('a detached worker cannot create new views', async () => {
  const rpc = {}
  ElectronWebContentsView.detachForHotReload(rpc)
  await expect(ElectronWebContentsView.createWebContentsView(rpc, 0, [], 7)).rejects.toThrow('restarting')
  expect(state.invocations).toEqual([])
})

test.each([0, 42])('a view creation finishing after detach does not recreate an old IPC mapping (restore ID %s)', async (restoreId) => {
  const pending = Promise.withResolvers<number>()
  const invoke = jest.fn<(method: string, ...args: readonly any[]) => Promise<any>>(async (method) => {
    if (method === 'ElectronWebContentsView.createWebContentsView') return pending.promise
  })
  MainProcess.set(MockRpc.create({ commandMap: {}, invoke }))
  const rpc = {}
  try {
    const creating = ElectronWebContentsView.createWebContentsView(rpc, restoreId, [], 7)
    ElectronWebContentsView.detachForHotReload(rpc)
    pending.resolve(42)
    await expect(creating).rejects.toThrow('restarting')
    expect(ElectronWebContentsViewIpcState.get(42)).toBeUndefined()
    const expectedCalls = [['ElectronWebContentsView.createWebContentsView', restoreId, 7]]
    if (restoreId === 0) {
      expectedCalls.push(['ElectronWebContentsView.disposeWebContentsView', 42])
    }
    expect(invoke.mock.calls).toEqual(expectedCalls)
  } finally {
    MainProcess.set(mockRpc)
  }
})
