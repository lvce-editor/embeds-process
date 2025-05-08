import * as Assert from '../Assert/Assert.ts'
import * as HandleIncomingIpc from '../HandleIncomingIpc/HandleIncomingIpc.ts'

export const handleElectronMessagePort = async (messagePort: any, ipcId: any) => {
  Assert.object(messagePort)
  Assert.number(ipcId)
  return HandleIncomingIpc.handleIncomingIpc(ipcId, messagePort, {})
}
