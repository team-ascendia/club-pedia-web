import { useRouter } from "next/navigation"
import React, { useEffect, useRef } from "react"
import { CloseHandler, ModalComponentRequiredProps, ModalItem } from "@/src/common/module/modal-manager/core/store"

type ModalControllerProps = {
  onMounted: () => void
  current: string | null
  onCloseModal: () => void
  onUnmountModal: () => void
  onClearModal: () => void
} & ModalItem<ModalComponentRequiredProps>

const ModalController = (props: ModalControllerProps) => {
  const { Component, id, isOpen, componentProps, onMounted, current, onClearModal, onCloseModal, onUnmountModal } =
    props
  const prevCurrent = useRef(current)
  const onMountedRef = useRef(onMounted)
  const router = useRouter()

  if (prevCurrent.current !== current && isOpen === false) {
    prevCurrent.current = current

    if (current === id) {
      onMountedRef.current()
    }
  }

  useEffect(() => {
    onMountedRef.current()
  }, [])

  const closeHandler: CloseHandler = props => {
    onCloseModal()

    if (props && props.closeWithRoute) {
      const { url } = props.closeWithRoute
      onClearModal()
      router.push(url)
      return
    }

    setTimeout(() => {
      onUnmountModal()
    }, 300)
  }

  return <Component {...(componentProps ?? {})} close={closeHandler} isOpen={isOpen} />
}

export default ModalController
