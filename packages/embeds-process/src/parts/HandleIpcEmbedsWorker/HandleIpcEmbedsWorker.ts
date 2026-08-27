import * as Assert from '../Assert/Assert.ts'
import * as CommandMapRef from '../CommandMapRef/CommandMapRef.ts'
import * as CreateEmbedsWorkerCommandExecutor from '../CreateEmbedsWorkerCommandExecutor/CreateEmbedsWorkerCommandExecutor.ts'
import * as HandleIpcClosed from '../HandleIpcClosed/HandleIpcClosed.ts'
import * as IpcChild from '../IpcChild/IpcChild.ts'
import * as IpcChildType from '../IpcChildType/IpcChildType.ts'

export const targetMessagePort = async (messagePort: any, message: any) => {
  Assert.object(messagePort)
  const rpc = await IpcChild.listen({
    commandMap: CommandMapRef.commandMapRef,
    messagePort,
    method: IpcChildType.ElectronMessagePort,
  })
  // @ts-ignore
  const { ipc } = rpc
  ipc.execute = CreateEmbedsWorkerCommandExecutor.createEmbedsWorkerCommandExecutor(rpc, CommandMapRef.commandMapRef)
  ipc.addEventListener('close', HandleIpcClosed.handleIpcClosed)
  return rpc
}

export const upgradeMessagePort = () => {
  return {
    type: 'handle',
  }
}
