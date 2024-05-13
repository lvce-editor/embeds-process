import * as Assert from '../Assert/Assert.js'
import * as HandleIncomingIpc from '../HandleIncomingIpc/HandleIncomingIpc.js'

export const handleElectronMessagePort = async (messagePort, ipcId) => {
  Assert.object(messagePort)
  Assert.number(ipcId)
  return HandleIncomingIpc.handleIncomingIpc(ipcId, messagePort, {})
}
