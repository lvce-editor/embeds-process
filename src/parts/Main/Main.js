import * as CommandMap from '../CommandMap/CommandMap.js'
import * as CommandMapRef from '../CommandMapRef/CommandMapRef.js'
import * as Listen from '../Listen/Listen.js'

export const main = async () => {
  Object.assign(CommandMapRef.commandMapRef, CommandMap.commandMap)
  await Listen.listen()
}
