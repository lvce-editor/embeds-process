const webContentViews = Object.create(null)

export const add = (id) => {
  webContentViews[id] = id
}

export const remove = (id) => {
  delete webContentViews[id]
}

export const getAll = () => {
  return Object.values(webContentViews)
}
