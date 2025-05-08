const ipcMap = Object.create(null)

export const add = (id: any, ipc: any) => {
  ipcMap[id] = ipc
}

export const get = (id: any) => {
  return ipcMap[id]
}

export const remove = (id: any) => {
  delete ipcMap[id]
}

export const getAll = () => {
  return Object.entries(ipcMap)
}
