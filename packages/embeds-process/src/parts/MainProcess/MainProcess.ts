import { MainProcess } from '@lvce-editor/rpc-registry'

export const invoke = (...args: Parameters<typeof MainProcess.invoke>): ReturnType<typeof MainProcess.invoke> => MainProcess.invoke(...args)
export const invokeAndTransfer = (...args: Parameters<typeof MainProcess.invokeAndTransfer>): ReturnType<typeof MainProcess.invokeAndTransfer> =>
  MainProcess.invokeAndTransfer(...args)
export const set = (...args: Parameters<typeof MainProcess.set>): ReturnType<typeof MainProcess.set> => MainProcess.set(...args)
