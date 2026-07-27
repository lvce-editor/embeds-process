import * as ElectronWebContentsView from '../ElectronWebContentsView/ElectronWebContentsView.ts'
import * as ElectronWebContentsViewIpcState from '../ElectronWebContentsViewIpcState/ElectronWebContentsViewIpcState.ts'

const getIdsToDispose = (ipc: any) => {
  const entries = ElectronWebContentsViewIpcState.getAll()
  const toDispose = []

  for (const [id, value] of entries) {
    if (value === ipc) {
      toDispose.push(Number.parseInt(id))
    }
  }
  return toDispose
}

export const handleIpcClosed = async (event: any, disposeWebContentsView = ElectronWebContentsView.disposeWebContentsView) => {
  const idsToDispose = getIdsToDispose(event.target)
  for (const id of idsToDispose) {
    ElectronWebContentsViewIpcState.remove(id)
    await disposeWebContentsView(id)
  }
  // SharedProcessIpc.send('HandleMessagePortForEmbedsProcess.handleEmbedsProcessIpcClosed')
}
