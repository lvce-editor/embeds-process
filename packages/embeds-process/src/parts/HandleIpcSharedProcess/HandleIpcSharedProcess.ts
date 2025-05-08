import { ElectronMessagePortRpcClient } from '@lvce-editor/rpc'
import * as Assert from '../Assert/Assert.ts'
import * as CommandMapRef from '../CommandMapRef/CommandMapRef.ts'
import * as SharedProcessIpc from '../SharedProcessIpc/SharedProcessIpc.ts'

export const targetMessagePort = async (messagePort: any, message: any) => {
  Assert.object(messagePort)
  const rpc = await ElectronMessagePortRpcClient.create({
    messagePort,
    commandMap: CommandMapRef.commandMapRef,
  })
  SharedProcessIpc.set(rpc)
  return rpc
}

export const upgradeMessagePort = () => {
  return {
    type: 'handle',
  }
}
