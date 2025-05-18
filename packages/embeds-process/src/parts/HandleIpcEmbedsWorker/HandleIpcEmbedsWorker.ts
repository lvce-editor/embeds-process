import * as Assert from '../Assert/Assert.ts'
import * as CommandMapRef from '../CommandMapRef/CommandMapRef.ts'
import * as HandleIpcClosed from '../HandleIpcClosed/HandleIpcClosed.ts'
import * as IpcChild from '../IpcChild/IpcChild.ts'
import * as IpcChildType from '../IpcChildType/IpcChildType.ts'

export const targetMessagePort = async (messagePort: any, message: any) => {
  Assert.object(messagePort)
  const rpc = await IpcChild.listen({
    method: IpcChildType.ElectronMessagePort,
    messagePort,
    commandMap: CommandMapRef.commandMapRef,
  })
  // @ts-ignore
  const { ipc } = rpc
  ipc.addEventListener('close', HandleIpcClosed.handleIpcClosed)
  return rpc
}

export const upgradeMessagePort = () => {
  return {
    type: 'handle',
  }
}
