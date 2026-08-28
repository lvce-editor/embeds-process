// cspell:ignore webcontents
import * as Assert from '../Assert/Assert.ts'
import * as ElectronWebContents from '../ElectronWebContents/ElectronWebContents.ts'
import * as ElectronWebContentsViewIpcState from '../ElectronWebContentsViewIpcState/ElectronWebContentsViewIpcState.ts'
import * as ParentIpc from '../MainProcess/MainProcess.ts'

export const createWebContentsView = async (ipc: any, restoreId: any, fallthroughKeyBindings: any) => {
  Assert.number(restoreId)
  // TODO race condition: ipc can be disposed while webcontents are being created
  const webContentsId = await ParentIpc.invoke('ElectronWebContentsView.createWebContentsView', restoreId)
  ElectronWebContentsViewIpcState.add(webContentsId, ipc)
  // TODO get window id from renderer worker
  await ParentIpc.invoke('ElectronWebContentsView.attachEventListeners', webContentsId)
  await ParentIpc.invoke('ElectronWebContentsViewFunctions.setBackgroundColor', webContentsId, 'white')
  return webContentsId
}

export const disposeWebContentsView = async (id: any) => {
  await ParentIpc.invoke('ElectronWebContentsView.disposeWebContentsView', id)
  await ElectronWebContents.dispose(id)
}

export const acceptLogin = async (requestId: string, username: string, password: string) => {
  return ParentIpc.invoke('ElectronWebContentsView.acceptLogin', requestId, username, password)
}

export const cancelLogin = async (requestId: string) => {
  return ParentIpc.invoke('ElectronWebContentsView.cancelLogin', requestId)
}

export const click = async (id: any, selector: string) => {
  return ParentIpc.invoke('ElectronWebContentsViewFunctions.click', id, selector)
}

export const resizeWebContentsView = async (id: any, ...args: readonly any[]) => {
  return ParentIpc.invoke('ElectronWebContentsViewFunctions.resizeBrowserView', id, ...args)
}

export const capturePage = async (id: any) => {
  return ParentIpc.invoke('ElectronWebContentsViewFunctions.capturePage', id)
}

export const setIframeSrc = async (id: any, ...args: readonly any[]) => {
  return ParentIpc.invoke('ElectronWebContentsViewFunctions.setIframeSrc', id, ...args)
}

export const setIframeSrcFallback = async (id: any, ...args: readonly any[]) => {
  return ParentIpc.invoke('ElectronWebContentsViewFunctions.setIframeSrcFallback', id, ...args)
}

export const setAudioMuted = async (id: any, muted: boolean) => {
  return ParentIpc.invoke('ElectronWebContentsViewFunctions.setAudioMuted', id, muted)
}

export const setFallthroughKeyBindings = async (id: any, ...args: readonly any[]) => {
  return ParentIpc.invoke('ElectronWebContentsViewFunctions.setFallthroughKeyBindings', id, ...args)
}

export const getStats = async (id: any, ...args: readonly any[]) => {
  return ParentIpc.invoke('ElectronWebContentsViewFunctions.getStats', id, ...args)
}

export const getDomTree = async (id: any) => {
  // @ts-ignore
  return ParentIpc.invoke('ElectronWebContentsViewFunctions.getDomTree', id)
}

export const insertCss = async (id: any, css: string) => {
  // @ts-ignore
  return ParentIpc.invoke('ElectronWebContentsViewFunctions.insertCss', id, css)
}

export const insertJavaScript = async (id: any, code: string, userGesture = false) => {
  // @ts-ignore
  return ParentIpc.invoke('ElectronWebContentsViewFunctions.insertJavaScript', id, code, userGesture)
}

export const show = async (id: any, ...args: readonly any[]) => {
  return ParentIpc.invoke('ElectronWebContentsViewFunctions.show', id, ...args)
}

export const hide = async (id: any, ...args: readonly any[]) => {
  return ParentIpc.invoke('ElectronWebContentsViewFunctions.hide', id, ...args)
}

export const setZoomLevel = (id: any, zoomLevel: number) => {
  return ElectronWebContents.setZoomLevel(id, zoomLevel)
}

export const toggleDevTools = (id: any) => {
  return ElectronWebContents.toggleDevTools(id)
}

const forwardIpcEvent =
  (key: string) =>
  (id: any, ...args: readonly any[]) => {
    const ipc = ElectronWebContentsViewIpcState.get(id)
    if (!ipc) {
      return
    }
    ipc.send(key, id, ...args)
  }

export const handleAudioStateChanged = forwardIpcEvent('ElectronWebContentsView.handleAudioStateChanged')

export const handleDidNavigate = forwardIpcEvent('ElectronWebContentsView.handleDidNavigate')

export const handlePageFaviconUpdated = forwardIpcEvent('ElectronWebContentsView.handlePageFaviconUpdated')

export const handleTitleUpdated = forwardIpcEvent('ElectronWebContentsView.handleTitleUpdated')

export const handleWillNavigate = forwardIpcEvent('ElectronWebContentsView.handleWillNavigate')

export const handleWindowOpen = forwardIpcEvent('ElectronWebContentsView.handleWindowOpen')

export const handleContextMenu = forwardIpcEvent('ElectronWebContentsView.handleContextMenu')

export const handleKeyBinding = forwardIpcEvent('ElectronWebContentsView.handleKeyBinding')

export const handleLogin = forwardIpcEvent('ElectronWebContentsView.handleLogin')

export const handleBrowserViewDestroyed = (id: any, ...args: readonly any[]) => {
  // TODO send to embeds worker?
}
