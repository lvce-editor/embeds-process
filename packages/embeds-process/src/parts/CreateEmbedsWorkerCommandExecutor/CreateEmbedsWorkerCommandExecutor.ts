type Command = (...params: readonly any[]) => any

type CommandMap = Readonly<Record<string, Command>>

const createWebContentsViewCommand = 'ElectronWebContentsView.createWebContentsView'

export const createEmbedsWorkerCommandExecutor = (rpc: any, commandMap: CommandMap): Command => {
  return (method: string, ...params: readonly any[]): any => {
    const command = commandMap[method]
    if (!command) {
      throw new Error(`Command not found ${method}`)
    }
    if (method === createWebContentsViewCommand) {
      return command(rpc, ...params)
    }
    return command(...params)
  }
}
