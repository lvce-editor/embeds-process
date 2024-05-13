const ipcMap = Object.create(null)

export const add = (id, ipc) => {
  ipcMap[id] = ipc
}

export const get = (id) => {
  return ipcMap[id]
}

export const remove = (id) => {
  delete ipcMap[id]
}

export const getAll = () => {
  return Object.entries(ipcMap)
}
