import * as CommandMap from '../CommandMap/CommandMap.ts'
import * as CommandMapRef from '../CommandMapRef/CommandMapRef.ts'
import * as IpcChild from '../IpcChild/IpcChild.ts'
import * as IpcChildType from '../IpcChildType/IpcChildType.ts'

export const listen = async (argv: readonly string[]): Promise<void> => {
  Object.assign(CommandMapRef.commandMapRef, CommandMap.commandMap)
  await IpcChild.listen({
    commandMap: CommandMap.commandMap,
    method: IpcChildType.Auto(argv),
  })
}
