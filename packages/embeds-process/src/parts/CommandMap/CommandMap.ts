import * as ElectronWebContents from '../ElectronWebContents/ElectronWebContents.ts'
import * as ElectronWebContentsView from '../ElectronWebContentsView/ElectronWebContentsView.ts'
import * as HandleElectronMessagePort from '../HandleElectronMessagePort/HandleElectronMessagePort.ts'
import * as Initialize from '../Initialize/Initialize.ts'

export const commandMap = {
  'ElectronWebContents.handleBrowserViewDestroyed': ElectronWebContentsView.handleBrowserViewDestroyed,
  'ElectronWebContents.handleContextMenu': ElectronWebContentsView.handleContextMenu,
  'ElectronWebContents.handleDidNavigate': ElectronWebContentsView.handleDidNavigate,
  'ElectronWebContents.handleLogin': ElectronWebContentsView.handleLogin,
  'ElectronWebContents.handleTitleUpdated': ElectronWebContentsView.handleTitleUpdated,
  'ElectronWebContents.handleWillNavigate': ElectronWebContentsView.handleWillNavigate,
  'ElectronWebContentsView.acceptLogin': ElectronWebContentsView.acceptLogin,
  'ElectronWebContentsView.backward': ElectronWebContents.backward,
  'ElectronWebContentsView.cancelLogin': ElectronWebContentsView.cancelLogin,
  'ElectronWebContentsView.capturePage': ElectronWebContentsView.capturePage,
  'ElectronWebContentsView.click': ElectronWebContentsView.click,
  'ElectronWebContentsView.createWebContentsView': ElectronWebContentsView.createWebContentsView,
  'ElectronWebContentsView.disposeWebContentsView': ElectronWebContentsView.disposeWebContentsView,
  'ElectronWebContentsView.focus': ElectronWebContents.focus,
  'ElectronWebContentsView.forward': ElectronWebContents.forward,
  'ElectronWebContentsView.getDomTree': ElectronWebContentsView.getDomTree,
  'ElectronWebContentsView.getStats': ElectronWebContentsView.getStats,
  'ElectronWebContentsView.handleKeyBinding': ElectronWebContentsView.handleKeyBinding,
  'ElectronWebContentsView.hide': ElectronWebContentsView.hide,
  'ElectronWebContentsView.insertCss': ElectronWebContentsView.insertCss,
  'ElectronWebContentsView.insertJavaScript': ElectronWebContentsView.insertJavaScript,
  'ElectronWebContentsView.inspectElement': ElectronWebContents.inspectElement,
  'ElectronWebContentsView.openDevtools': ElectronWebContents.openDevtools,
  'ElectronWebContentsView.reload': ElectronWebContents.reload,
  'ElectronWebContentsView.resizeBrowserView': ElectronWebContentsView.resizeWebContentsView,
  'ElectronWebContentsView.setFallthroughKeyBindings': ElectronWebContentsView.setFallthroughKeyBindings,
  'ElectronWebContentsView.setIframeSrc': ElectronWebContentsView.setIframeSrc,
  'ElectronWebContentsView.setIframeSrcFallback': ElectronWebContentsView.setIframeSrcFallback,
  'ElectronWebContentsView.show': ElectronWebContentsView.show,
  'HandleElectronMessagePort.handleElectronMessagePort': HandleElectronMessagePort.handleElectronMessagePort,
  'Initialize.initialize': Initialize.initialize,
}
