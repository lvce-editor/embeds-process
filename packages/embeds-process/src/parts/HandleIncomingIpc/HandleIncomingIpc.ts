import * as ApplyIncomingIpcResponse from '../ApplyIncomingIpcResponse/ApplyIncomingIpcResponse.ts'
import * as Assert from '../Assert/Assert.ts'
import * as HandleIncomingIpcMessagePort from '../HandleIncomingIpcMessagePort/HandleIncomingIpcMessagePort.ts'
import * as HandleIpcModule from '../HandleIpcModule/HandleIpcModule.ts'

const getIpcAndResponse = (module: any, handle: any, message: any) => {
  return HandleIncomingIpcMessagePort.handleIncomingIpcMessagePort(module, handle, message)
}

export const handleIncomingIpc = async (ipcId: any, handle: any, message: any) => {
  Assert.number(ipcId)
  const module = HandleIpcModule.getModule(ipcId)
  const { response, target } = await getIpcAndResponse(module, handle, message)
  await ApplyIncomingIpcResponse.applyIncomingIpcResponse(target, response, ipcId)
}
