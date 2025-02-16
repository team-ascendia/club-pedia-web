import { useRouter } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"
import { CloseHandler, ModalComponentRequiredProps, ModalItem } from "@/src/common/module/modal-manager/core/store"

type ModalControllerProps = {
  onMounted: () => void
  current: string | null
  onCloseModal: () => void
  onUnmountModal: () => void
  onClearModal: () => void
  processingClose: boolean
} & ModalItem<ModalComponentRequiredProps>

const ModalController = (props: ModalControllerProps) => {
  const {
    Component,
    id,
    isOpen,
    componentProps,
    onMounted,
    current,
    onClearModal,
    onCloseModal,
    onUnmountModal,
    processingClose,
    unmountPromise,
  } = props
  const [afterClose, setAfterClose] = useState(false)
  const [ready, setReady] = useState(false)
  const prevCurrent = useRef(current)
  const onMountedRef = useRef(onMounted)
  const router = useRouter()

  if (prevCurrent.current !== current && isOpen === false) {
    prevCurrent.current = current

    if (current === id) {
      onMountedRef.current()
    }
  }

  // 첫 Mount시 Add 된 modal Open 처리
  useEffect(() => {
    onMountedRef.current()
    setReady(true)
  }, [])

  // Close 관련 처리
  useEffect(() => {
    if (!afterClose) return

    const unmountHandler = async () => {
      await unmountPromise?.()
      onUnmountModal()
      if (!processingClose) {
        window.history.replaceState(null, "", window.location.href)
      } else if (prevCurrent.current === null) {
        router.back()
      }
    }

    unmountHandler()
  }, [afterClose])

  useEffect(() => {
    if (!ready) return

    if (processingClose) {
      window.history.replaceState(null, "", window.location.href)
    } else {
      window.history.pushState(null, "", window.location.href)
    }
  }, [ready])

  const closeHandler: CloseHandler = ({ closeWithRoute }) => {
    onCloseModal()

    if (closeWithRoute) {
      onClearModal()
      router.replace(closeWithRoute.url)
      return
    }

    setAfterClose(true)
  }

  return <Component {...(componentProps ?? {})} close={closeHandler} isOpen={isOpen} />
}

export default ModalController
