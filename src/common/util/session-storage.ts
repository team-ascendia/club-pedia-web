"use client"

import { onlyClient } from "./client"

// session storage get
export const getSessionStorage = onlyClient((key: string): string | null => {
  return sessionStorage.getItem(key)
})

// session storage set
export const setSessionStorage = onlyClient((key: string, value: string) => {
  sessionStorage.setItem(key, value)
})

// session storage remove
export const removeSessionStorage = onlyClient((key: string): void => {
  sessionStorage.removeItem(key)
})
