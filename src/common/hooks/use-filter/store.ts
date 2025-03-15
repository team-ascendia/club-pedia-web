import { getSessionStorage, setSessionStorage } from "@/src/common/util/session-storage"

function createFilterStore<T extends Record<string, any>>(key: string, initialState: Partial<T> = {}) {
  let state = initialState
  const listeners = new Set<() => void>()

  const storedData = getSessionStorage(key)
  if (storedData) {
    state = JSON.parse(storedData)
  }

  const getState = () => state

  const setState = (newState: Partial<T> | ((prevState: Partial<T>) => Partial<T>)) => {
    if (typeof newState === "function") {
      state = newState(state)
    } else {
      state = { ...state, ...newState }
    }

    setSessionStorage(key, JSON.stringify(state))
    listeners.forEach(listener => listener())
  }

  const subscribe = (callback: () => void) => {
    listeners.add(callback)
    return () => listeners.delete(callback)
  }

  const resetState = () => {
    state = {}
    setSessionStorage(key, "")
    listeners.forEach(listener => listener())
  }

  return {
    getState,
    setState,
    subscribe,
    resetState,
  }
}

export default createFilterStore
