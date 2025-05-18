import type { MessagePortMain } from 'electron'
import * as CreateMainProcessRpc from '../CreateMainProcessRpc/CreateMainProcessRpc.ts'
import * as MainProcess from '../MainProcess/MainProcess.ts'

export const initialize = async (port: MessagePortMain): Promise<void> => {
  const rpc = await CreateMainProcessRpc.createMainProcessRpc(port)
  MainProcess.set(rpc)
}
