"use client"

import { RefObject, useEffect } from "react"

function useOutsideClick<T extends HTMLElement>(ref: RefObject<T | null>, callback: () => void) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside) // 모바일 대응

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [ref, callback])
}

export default useOutsideClick
