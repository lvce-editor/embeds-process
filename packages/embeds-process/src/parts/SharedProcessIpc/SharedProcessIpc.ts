import { SharedProcess } from '@lvce-editor/rpc-registry'

export const invoke = (...args: Parameters<typeof SharedProcess.invoke>): ReturnType<typeof SharedProcess.invoke> => SharedProcess.invoke(...args)
export const set = (...args: Parameters<typeof SharedProcess.set>): ReturnType<typeof SharedProcess.set> => SharedProcess.set(...args)
