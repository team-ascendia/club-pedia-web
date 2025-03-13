import { RefObject, useEffect, useRef } from "react"

interface useDragDownProps {
  modalRef: RefObject<HTMLDivElement | null>
  handleRef: RefObject<HTMLDivElement | null>
  close: () => void
  threshold?: number
}

export const useBottomSheetDragClose = ({ modalRef, handleRef, close, threshold = 70 }: useDragDownProps) => {
  const isDragging = useRef(false)
  const startY = useRef(0)
  const dragOffset = useRef(0)

  const onDragEnd = () => {
    if (!isDragging.current || !modalRef.current) return

    isDragging.current = false
    modalRef.current.style.transition = "transform 0.3s ease"

    if (dragOffset.current > threshold) {
      close()
    } else {
      modalRef.current.style.transform = "translate3d(0, 0, 0)"
    }
  }

  const onTouchOrMouseStart = (clientY: number) => {
    isDragging.current = true
    dragOffset.current = 0
    startY.current = clientY
    modalRef.current!.style.transition = ""
  }

  const onTouchOrMouseMove = (clientY: number) => {
    if (!isDragging.current || !modalRef.current) return

    const dy = clientY - startY.current
    dragOffset.current = Math.max(dragOffset.current + dy, 0)
    startY.current = clientY
    modalRef.current.style.transform = `translate3d(0, ${dragOffset.current}px, 0)`
  }

  useEffect(() => {
    if (!handleRef.current || !modalRef.current) return

    const onMouseDown = (e: MouseEvent) => onTouchOrMouseStart(e.clientY)
    const onMouseMove = (e: MouseEvent) => onTouchOrMouseMove(e.clientY)
    const onMouseUp = onDragEnd

    const onTouchStart = (e: TouchEvent) => onTouchOrMouseStart(e.changedTouches[0].clientY)
    const onTouchMove = (e: TouchEvent) => onTouchOrMouseMove(e.changedTouches[0].clientY)
    const onTouchEnd = onDragEnd

    handleRef.current.addEventListener("mousedown", onMouseDown)
    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseup", onMouseUp)

    handleRef.current.addEventListener("touchstart", onTouchStart, { passive: true })
    document.addEventListener("touchmove", onTouchMove, { passive: true })
    document.addEventListener("touchend", onTouchEnd)

    return () => {
      handleRef.current?.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseup", onMouseUp)

      handleRef.current?.removeEventListener("touchstart", onTouchStart)
      document.removeEventListener("touchmove", onTouchMove)
      document.removeEventListener("touchend", onTouchEnd)
    }
  }, [handleRef, modalRef, close, threshold])
}
