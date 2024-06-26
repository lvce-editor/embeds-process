import * as ElectronWebContents from '../ElectronWebContents/ElectronWebContents.js'
import * as ElectronWebContentsView from '../ElectronWebContentsView/ElectronWebContentsView.js'
import * as HandleElectronMessagePort from '../HandleElectronMessagePort/HandleElectronMessagePort.js'

export const commandMap = {
  'ElectronWebContentsView.backward': ElectronWebContents.backward,
  'ElectronWebContentsView.createWebContentsView': ElectronWebContentsView.createWebContentsView,
  'ElectronWebContentsView.disposeWebContentsView': ElectronWebContentsView.disposeWebContentsView,
  'ElectronWebContentsView.focus': ElectronWebContents.focus,
  'ElectronWebContentsView.forward': ElectronWebContents.forward,
  'ElectronWebContentsView.getStats': ElectronWebContentsView.getStats,
  'ElectronWebContentsView.inspectElement': ElectronWebContents.inspectElement,
  'ElectronWebContentsView.openDevtools': ElectronWebContents.openDevtools,
  'ElectronWebContentsView.reload': ElectronWebContents.reload,
  'ElectronWebContentsView.resizeBrowserView': ElectronWebContentsView.resizeWebContentsView,
  'ElectronWebContentsView.setIframeSrc': ElectronWebContentsView.setIframeSrc,
  'ElectronWebContentsView.setIframeSrcFallback': ElectronWebContentsView.setIframeSrcFallback,
  'ElectronWebContentsView.setFallthroughKeyBindings': ElectronWebContentsView.setFallthroughKeyBindings,
  'ElectronWebContentsView.handleKeyBinding': ElectronWebContentsView.handleKeyBinding,
  'ElectronWebContentsView.show': ElectronWebContentsView.show,
  'ElectronWebContents.handleDidNavigate': ElectronWebContentsView.handleDidNavigate,
  'ElectronWebContents.handleTitleUpdated': ElectronWebContentsView.handleTitleUpdated,
  'ElectronWebContents.handleBrowserViewDestroyed': ElectronWebContentsView.handleBrowserViewDestroyed,
  'ElectronWebContents.handleWillNavigate': ElectronWebContentsView.handleWillNavigate,
  'ElectronWebContents.handleContextMenu': ElectronWebContentsView.handleContextMenu,
  'HandleElectronMessagePort.handleElectronMessagePort': HandleElectronMessagePort.handleElectronMessagePort,
}
