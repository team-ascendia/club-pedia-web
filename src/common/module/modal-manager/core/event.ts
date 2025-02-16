"use client"

import { ModalItem, ModalStore } from "./store"

type OmitIsOpenModalItem<T = (props: unknown) => React.JSX.Element> = Omit<ModalItem<T>, "isOpen"> & {}

export function createOverlay(overlayStore: ModalStore) {
  function open<T>(modalItem: OmitIsOpenModalItem<T>) {
    overlayStore.dispatchOverlay({
      type: "ADD",
      overlay: {
        ...modalItem,
        isOpen: false,
      } as ModalItem<unknown>,
    })

    return modalItem.id
  }

  function close(overlayId: string) {
    overlayStore.dispatchOverlay({ type: "CLOSE", overlayId })
  }
  function unmount(overlayId: string) {
    overlayStore.dispatchOverlay({ type: "REMOVE", overlayId })
  }
  function closeAll() {
    overlayStore.dispatchOverlay({ type: "CLOSE_ALL" })
  }
  function unmountAll() {
    overlayStore.dispatchOverlay({ type: "REMOVE_ALL" })
  }

  return {
    open,
    close,
    unmount,
    closeAll,
    unmountAll,
  }
}
