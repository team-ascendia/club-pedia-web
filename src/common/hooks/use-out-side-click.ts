"use client"

import { RefObject, useEffect } from "react"

type UseOutSideClickProps<T> = {
  ref: RefObject<T | null>
  callback: () => void
}

const useOutsideClick = (props: UseOutSideClickProps<HTMLElement>) => {
  const { callback, ref } = props
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (event.which === 1 && ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [ref, callback])
}

export default useOutsideClick
