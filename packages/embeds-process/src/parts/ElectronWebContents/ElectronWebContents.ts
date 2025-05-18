import * as ElectronWebContentsViewIpcState from '../ElectronWebContentsViewIpcState/ElectronWebContentsViewIpcState.ts'
import * as ElectronWebContentsViewState from '../ElectronWebContentsViewState/ElectronWebContentsViewState.ts'
import * as ParentIpc from '../MainProcess/MainProcess.ts'
import { VError } from '../VError/VError.ts'

export const dispose = async (id: any): Promise<void> => {
  try {
    await ParentIpc.invoke('ElectronWebContents.dispose', id)
  } catch (error) {
    throw new VError(error, `Failed to dispose webcontents`)
  }
}

export const callFunction = (webContentsId: any, method: any, ...params: readonly any[]) => {
  return ParentIpc.invoke(`ElectronWebContents.callFunction`, webContentsId, method, ...params)
}

export const focus = (webContentsId: any) => {
  return callFunction(webContentsId, 'focus')
}

export const openDevtools = (webContentsId: any) => {
  return callFunction(webContentsId, 'openDevTools')
}

export const reload = (webContentsId: any) => {
  return callFunction(webContentsId, 'reload')
}

export const forward = (webContentsId: any) => {
  return callFunction(webContentsId, 'goForward')
}

export const backward = (webContentsId: any) => {
  return callFunction(webContentsId, 'goBack')
}

export const inspectElement = (webContentsId: any, x: number, y: number) => {
  return callFunction(webContentsId, `inspectElement`, x, y)
}

export const handleWindowOpen = (webContentsId: any, url: any) => {
  // TODO
}

const forwardEvent = (method: any, webContentsId: any, ...params: readonly any[]) => {
  const ipc = ElectronWebContentsViewIpcState.get(webContentsId)
  if (!ipc) {
    // eslint-disable-next-line  no-console
    console.log(`[shared-process] no ipc for webcontents ${webContentsId}`)
    return
  }
  ipc.send({
    jsonrpc: '2.0',
    method: `SimpleBrowser.${method}`,
    params,
  })
}

export const handleWillNavigate = (...args: readonly any[]) => {
  // @ts-ignore
  return forwardEvent('handleWillNavigate', ...args)
}

export const handleDidNavigate = (...args: readonly any[]) => {
  // @ts-ignore
  return forwardEvent('handleDidNavigate', ...args)
}

export const handleContextMenu = (...args: readonly any[]) => {
  // @ts-ignore
  return forwardEvent('handleContextMenu', ...args)
}

export const handleTitleUpdated = (...args: readonly any[]) => {
  // @ts-ignore
  return forwardEvent('handleTitleUpdated', ...args)
}

export const handleKeyBinding = (...args: readonly any[]) => {
  // @ts-ignore
  forwardEvent('handleKeyBinding', ...args)
}

export const handleWebContentsViewDestroyed = (id: any) => {
  ElectronWebContentsViewState.remove(id)
  ElectronWebContentsViewIpcState.remove(id)
}
