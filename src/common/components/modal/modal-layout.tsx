"use client"

import { usePathname } from "next/navigation"
import { PropsWithChildren, useEffect, useRef } from "react"
import { useBottomSheetDragClose } from "./hooks/use-bottom-sheet-drag"
import BottomNavigation from "@/src/common/components/layout/bottom-navigation"
import useOutsideClick from "@/src/common/hooks/use-out-side-click"
import { ModalComponentRequiredProps } from "@/src/common/module/modal-manager"
import cn from "@/src/common/util/cn"

const _getBottomSheetAnimation = (isOpen: boolean) => {
  return isOpen
    ? "bottom-0 translate-y-0 opacity-100 transition-all duration-300"
    : "bottom-0 translate-y-full opacity-0 transition-all duration-300"
}

interface ModalLayoutProps extends PropsWithChildren, ModalComponentRequiredProps {
  className?: string
  withBottomSheetAnimation?: boolean
  withBottomSheetDragHandler?: boolean
  withBottomNavigation?: boolean
  fullScreen?: boolean
}

const ModalLayout = (props: ModalLayoutProps) => {
  const {
    close,
    className,
    children,
    withBottomSheetAnimation,
    withBottomNavigation,
    fullScreen,
    withBottomSheetDragHandler,
    isOpen,
  } = props

  const outsideRef = useRef<HTMLDivElement>(null)
  const dragHandlerRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const pathname = usePathname()

  useOutsideClick({
    callback: close,
    ref: outsideRef,
  })

  useBottomSheetDragClose({
    close: () => close(),
    modalRef,
    handleRef: dragHandlerRef,
  })

  useEffect(() => {
    return () => {
      close()
    }
  }, [pathname])

  return (
    <div className={cn("flex h-full w-full flex-col absolute")} ref={modalRef}>
      <div
        ref={outsideRef}
        className={cn("absolute", className, withBottomSheetAnimation && _getBottomSheetAnimation(isOpen), {
          "h-dvh w-full": fullScreen,
        })}
      >
        {withBottomSheetDragHandler && (
          <div className="py-2" ref={dragHandlerRef}>
            <div className="mx-auto h-1 w-1/6 shrink-0 rounded-full bg-gray-300" />
          </div>
        )}
        {children}
        {withBottomNavigation && <BottomNavigation />}
      </div>
    </div>
  )
}

export default ModalLayout
