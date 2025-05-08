const webContentViews = Object.create(null)

export const add = (id: any): void => {
  webContentViews[id] = id
}

export const remove = (id: any): void => {
  delete webContentViews[id]
}

export const getAll = (): readonly any[] => {
  return Object.values(webContentViews)
}
