import * as ElectronWebContents from '../ElectronWebContents/ElectronWebContents.ts'
import * as ElectronWebContentsView from '../ElectronWebContentsView/ElectronWebContentsView.ts'
import * as HandleElectronMessagePort from '../HandleElectronMessagePort/HandleElectronMessagePort.ts'

export const commandMap = {
  'ElectronWebContents.handleBrowserViewDestroyed': ElectronWebContentsView.handleBrowserViewDestroyed,
  'ElectronWebContents.handleContextMenu': ElectronWebContentsView.handleContextMenu,
  'ElectronWebContents.handleDidNavigate': ElectronWebContentsView.handleDidNavigate,
  'ElectronWebContents.handleTitleUpdated': ElectronWebContentsView.handleTitleUpdated,
  'ElectronWebContents.handleWillNavigate': ElectronWebContentsView.handleWillNavigate,
  'ElectronWebContentsView.backward': ElectronWebContents.backward,
  'ElectronWebContentsView.createWebContentsView': ElectronWebContentsView.createWebContentsView,
  'ElectronWebContentsView.disposeWebContentsView': ElectronWebContentsView.disposeWebContentsView,
  'ElectronWebContentsView.focus': ElectronWebContents.focus,
  'ElectronWebContentsView.forward': ElectronWebContents.forward,
  'ElectronWebContentsView.getDomTree': ElectronWebContentsView.getDomTree,
  'ElectronWebContentsView.getStats': ElectronWebContentsView.getStats,
  'ElectronWebContentsView.handleKeyBinding': ElectronWebContentsView.handleKeyBinding,
  'ElectronWebContentsView.insertCss': ElectronWebContentsView.insertCss,
  'ElectronWebContentsView.inspectElement': ElectronWebContents.inspectElement,
  'ElectronWebContentsView.openDevtools': ElectronWebContents.openDevtools,
  'ElectronWebContentsView.reload': ElectronWebContents.reload,
  'ElectronWebContentsView.resizeBrowserView': ElectronWebContentsView.resizeWebContentsView,
  'ElectronWebContentsView.setFallthroughKeyBindings': ElectronWebContentsView.setFallthroughKeyBindings,
  'ElectronWebContentsView.setIframeSrc': ElectronWebContentsView.setIframeSrc,
  'ElectronWebContentsView.setIframeSrcFallback': ElectronWebContentsView.setIframeSrcFallback,
  'ElectronWebContentsView.show': ElectronWebContentsView.show,
  'HandleElectronMessagePort.handleElectronMessagePort': HandleElectronMessagePort.handleElectronMessagePort,
}
