type Command = (...params: readonly any[]) => any

type CommandMap = Readonly<Record<string, Command>>

const createWebContentsViewCommand = 'ElectronWebContentsView.createWebContentsView'

export const createEmbedsWorkerCommandExecutor = (ipc: any, commandMap: CommandMap): Command => {
  return (method: string, ...params: readonly any[]): any => {
    const command = commandMap[method]
    if (!command) {
      throw new Error(`Command not found ${method}`)
    }
    if (method === createWebContentsViewCommand) {
      return command(ipc, ...params)
    }
    return command(...params)
  }
}
