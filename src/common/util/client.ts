"use client"

export const onlyClient = <TProps, TReturn>(fn: (...args: TProps[]) => TReturn) => {
  if (globalThis.window == null) return () => {}
  return (...args: TProps[]) => fn(...args)
}
