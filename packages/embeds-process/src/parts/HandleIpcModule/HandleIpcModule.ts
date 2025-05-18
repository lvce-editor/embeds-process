import * as Assert from '../Assert/Assert.ts'
import * as HandleIpcEmbedsWorker from '../HandleIpcEmbedsWorker/HandleIpcEmbedsWorker.ts'
import * as HandleIpcMainProcess from '../HandleIpcMainProcess/HandleIpcMainProcess.ts'
import * as HandleIpcSharedProcess from '../HandleIpcSharedProcess/HandleIpcSharedProcess.ts'
import * as IpcId from '../IpcId/IpcId.ts'

export const getModule = (ipcId: number) => {
  Assert.number(ipcId)
  switch (ipcId) {
    case IpcId.SharedProcess:
      return HandleIpcSharedProcess // deprecated
    case IpcId.EmbedsWorker:
    case IpcId.EmbedsWorkerAlt:
      return HandleIpcEmbedsWorker
    case IpcId.MainProcess:
      return HandleIpcMainProcess // deprecated
    default:
      throw new Error(`Embeds process encountered unexpected incoming ipc ${ipcId}`)
  }
}
