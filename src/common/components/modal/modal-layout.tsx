import { PropsWithChildren, useRef } from "react"
import useOutsideClick from "@/src/common/hooks/use-out-side-click"
import { CloseHandler } from "@/src/common/module/modal-manager"
import cn from "@/src/common/util/cn"

interface ModalLayoutProps extends PropsWithChildren {
  className?: string
  close: CloseHandler
}

const ModalLayout = (props: ModalLayoutProps) => {
  const { close, className, children } = props

  const outsideRef = useRef<HTMLDivElement>(null)
  useOutsideClick(outsideRef, () => close({}))

  return (
    <div ref={outsideRef} className={cn("absolute", className)}>
      {children}
    </div>
  )
}

export default ModalLayout
