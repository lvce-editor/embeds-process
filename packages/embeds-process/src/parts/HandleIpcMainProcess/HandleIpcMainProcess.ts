import * as Assert from '../Assert/Assert.ts'
import * as IpcChild from '../IpcChild/IpcChild.ts'
import * as IpcChildType from '../IpcChildType/IpcChildType.ts'
import * as ParentIpc from '../ParentIpc/ParentIpc.ts'

export const targetMessagePort = async (messagePort: any, message: any) => {
  Assert.object(messagePort)
  const ipc = await IpcChild.listen({
    method: IpcChildType.ElectronMessagePort,
    messagePort,
  })
  // @ts-ignore
  ParentIpc.state.ipc = ipc
  return ipc
}

export const upgradeMessagePort = () => {
  return {
    type: 'handle',
  }
}
