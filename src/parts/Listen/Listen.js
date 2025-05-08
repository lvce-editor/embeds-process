import * as HandleIpc from '../HandleIpc/HandleIpc.js'
import * as IpcChild from '../IpcChild/IpcChild.js'
import * as IpcChildType from '../IpcChildType/IpcChildType.js'
import * as ParentIpc from '../ParentIpc/ParentIpc.js'

export const listen = async () => {
  const rpc = await IpcChild.listen({ method: IpcChildType.Auto() })
  HandleIpc.handleIpc(rpc)
  ParentIpc.state.ipc = rpc
}
