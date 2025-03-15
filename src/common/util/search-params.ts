export const getURLSearchParamsByObject = (params: object) => {
  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    searchParams.set(key, value)
  })

  return searchParams
}
