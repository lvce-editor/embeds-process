export const handleIncomingIpcMessagePort = async (module: any, handle: any, message: any) => {
  const target = await module.targetMessagePort(handle, message)
  const response = module.upgradeMessagePort(handle, message)
  return {
    response,
    target,
  }
}
