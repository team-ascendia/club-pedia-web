import { PropsWithChildren, useRef } from "react"
import { useBottomSheetDragClose } from "./use-bottom-sheet-drag"
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
}

const ModalLayout = (props: ModalLayoutProps) => {
  const { close, className, children, withBottomSheetAnimation, withBottomSheetDragHandler, isOpen } = props

  const outsideRef = useRef<HTMLDivElement>(null)
  const dragHandlerRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  useOutsideClick({
    callback: close,
    ref: outsideRef,
  })

  useBottomSheetDragClose({
    close: () => close(),
    modalRef,
    handleRef: dragHandlerRef,
  })

  return (
    <div className={cn("flex h-full w-full flex-col rounded-t-4 absolute")} ref={modalRef}>
      <div
        ref={outsideRef}
        className={cn("absolute", className, withBottomSheetAnimation && _getBottomSheetAnimation(isOpen))}
      >
        {withBottomSheetDragHandler && (
          <div className="py-2" ref={dragHandlerRef}>
            <div className="mx-auto h-1 w-1/6 shrink-0 rounded-full bg-gray-300" />
          </div>
        )}
        {children}
      </div>
    </div>
  )
}

export default ModalLayout
