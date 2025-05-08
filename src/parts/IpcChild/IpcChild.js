import * as IpcChildModule from '../IpcChildModule/IpcChildModule.js'

export const listen = async ({ method, ...params }) => {
  const fn = IpcChildModule.getModule(method)
  // @ts-ignore
  const rpc = await fn({ ...params })
  return rpc
}
