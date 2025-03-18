"use client"

import { PropsWithChildren, createContext } from "react"
import ModalController from "./modal-controller"
import useSyncModalStore from "./use-sync-overlay-store"
import { createOverlay } from "@/src/common/module/modal-manager/core/event"
import { ModalStore } from "@/src/common/module/modal-manager/core/store"

export const ModalContext = createContext<null>(null)

const createModalProvider = (modalStore: ModalStore) => {
  const modalManager = createOverlay(modalStore)

  const ModalProvider = (props: PropsWithChildren) => {
    const { children } = props
    const modalState = useSyncModalStore(modalStore)

    return (
      <ModalContext value={null}>
        {children}
        {modalState.modalOrderList.map(item => {
          const { id, Component, componentProps, isOpen } = modalState.modalData[item]
          return (
            <ModalController
              key={id}
              Component={Component as any}
              componentProps={componentProps}
              isOpen={isOpen}
              id={id}
              onMounted={() => {
                requestAnimationFrame(() => {
                  modalStore.dispatchOverlay({ type: "OPEN", overlayId: id })
                })
              }}
              onCloseModal={() => modalManager.close(id)}
              onUnmountModal={() => modalManager.unmount(id)}
              onClearModal={() => modalManager.unmountAll()}
              current={modalState.current}
            />
          )
        })}
      </ModalContext>
    )
  }

  return { ModalProvider, modalManager }
}

export default createModalProvider
