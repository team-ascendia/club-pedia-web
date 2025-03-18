import { usePathname, useSearchParams } from "next/navigation"
import { useSyncExternalStore } from "react"
import createFilterStore from "./store"

type FilterStore<T extends Record<string, any>> = {
  filters: Partial<T>
  setFilters: (newFilters: Partial<T> | ((prevState: Partial<T>) => Partial<T>)) => void
  resetFilters: () => void
  handleSetSearchParams: (data: Record<string, any>) => void
  searchParamsString: string
  allSearchParams: Record<string, string | string[] | undefined>
}

const stores: Record<
  string,
  {
    getState: () => any
    subscribe: (callback: () => void) => () => void
    setState: (newState: any) => void
    resetState: () => void
  }
> = {}

const useFilter = <T extends Record<string, any>>() => {
  const pathname = usePathname()
  const storageKey = `${pathname}`
  const searchParams = useSearchParams()

  if (!stores[storageKey]) {
    stores[storageKey] = createFilterStore<Partial<T>>(storageKey)
  }

  const store = stores[storageKey]

  const value = useSyncExternalStore(store.subscribe, store.getState, store.getState)

  const filters = typeof window === "undefined" ? {} : value

  const handleResetFilter = () => {
    store.resetState()
    window.history.replaceState(null, "", window.location.pathname)
  }

  const handleSetSearchParams = (data: Record<string, any>) => {
    const searchParams = new URLSearchParams()

    Object.entries(data).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        searchParams.delete(key)
      } else if (Array.isArray(value)) {
        if (value.length > 0) {
          searchParams.set(key, value.join(","))
        } else {
          searchParams.delete(key)
        }
      } else {
        searchParams.set(key, String(value))
      }
    })

    window.history.replaceState(null, "", `?${searchParams.toString()}`)
  }

  const getAllParams = () => {
    if (typeof window === "undefined") return {}
    const paramString = searchParams.toString()
    const params = new URLSearchParams(paramString)
    const result: Record<string, string | string[]> = {}

    params.forEach((_, key) => {
      const values = params.getAll(key)
      result[key] = values.length > 1 ? values : values[0]
    })

    return result
  }

  return {
    filters,
    setFilters: store.setState,
    resetFilters: handleResetFilter,
    handleSetSearchParams,
    allSearchParams: getAllParams(),
  } as FilterStore<T>
}

export default useFilter
