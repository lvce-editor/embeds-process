import * as HandleIpc from '../HandleIpc/HandleIpc.ts'

export const applyIncomingIpcResponse = async (target: any, response: any, ipcId: any) => {
  switch (response.type) {
    case 'handle':
      HandleIpc.handleIpc(target)
      break
    default:
      throw new Error('unexpected response')
  }
}
