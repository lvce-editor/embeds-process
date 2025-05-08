import * as Assert from '../Assert/Assert.ts'
import * as ElectronWebContents from '../ElectronWebContents/ElectronWebContents.ts'
import * as ElectronWebContentsViewIpcState from '../ElectronWebContentsViewIpcState/ElectronWebContentsViewIpcState.ts'
import * as ParentIpc from '../ParentIpc/ParentIpc.ts'

export const createWebContentsView = async (ipcId: any, restoreId: any, fallthroughKeyBindings: any) => {
  Assert.number(restoreId)
  // TODO race condition: ipc can be disposed while webcontents are being created
  const webContentsId = await ParentIpc.invoke('ElectronWebContentsView.createWebContentsView', restoreId)
  ElectronWebContentsViewIpcState.add(webContentsId, ipcId)
  // TODO get window id from renderer worker
  await ParentIpc.invoke('ElectronWebContentsView.attachEventListeners', webContentsId)
  await ParentIpc.invoke('ElectronWebContentsViewFunctions.setBackgroundColor', webContentsId, 'white')
  return webContentsId
}

export const disposeWebContentsView = async (id: any) => {
  await ParentIpc.invoke('ElectronWebContentsView.disposeWebContentsView', id)
  await ElectronWebContents.dispose(id)
}

export const resizeWebContentsView = async (id: any, ...args: readonly any[]) => {
  return ParentIpc.invoke('ElectronWebContentsViewFunctions.resizeBrowserView', id, ...args)
}

export const setIframeSrc = async (id: any, ...args: readonly any[]) => {
  return ParentIpc.invoke('ElectronWebContentsViewFunctions.setIframeSrc', id, ...args)
}

export const setIframeSrcFallback = async (id: any, ...args: readonly any[]) => {
  return ParentIpc.invoke('ElectronWebContentsViewFunctions.setIframeSrcFallback', id, ...args)
}

export const setFallthroughKeyBindings = async (id: any, ...args: readonly any[]) => {
  return ParentIpc.invoke('ElectronWebContentsViewFunctions.setFallthroughKeyBindings', id, ...args)
}

export const getStats = async (id: any, ...args: readonly any[]) => {
  return ParentIpc.invoke('ElectronWebContentsViewFunctions.getStats', id, ...args)
}

export const show = async (id: any, ...args: readonly any[]) => {
  return ParentIpc.invoke('ElectronWebContentsViewFunctions.show', id, ...args)
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

export const handleDidNavigate = forwardIpcEvent('ElectronWebContentsView.handleDidNavigate')

export const handleTitleUpdated = forwardIpcEvent('ElectronWebContentsView.handleTitleUpdated')

export const handleWillNavigate = forwardIpcEvent('ElectronWebContentsView.handleWillNavigate')

export const handleContextMenu = forwardIpcEvent('ElectronWebContentsView.handleContextMenu')

export const handleKeyBinding = forwardIpcEvent('ElectronWebContentsView.handleKeyBinding')

export const handleBrowserViewDestroyed = (id: any, ...args: readonly any[]) => {
  // TODO send to embeds worker?
}
