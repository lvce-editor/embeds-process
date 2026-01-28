import * as Assert from '../Assert/Assert.ts'
import * as IpcChild from '../IpcChild/IpcChild.ts'
import * as IpcChildType from '../IpcChildType/IpcChildType.ts'
import * as ParentIpc from '../MainProcess/MainProcess.ts'

export const targetMessagePort = async (messagePort: any, message: any) => {
  Assert.object(messagePort)
  const rpc = await IpcChild.listen({
    messagePort,
    method: IpcChildType.ElectronMessagePort,
  })
  ParentIpc.set(rpc)
  return rpc
}

export const upgradeMessagePort = () => {
  return {
    type: 'handle',
  }
}
