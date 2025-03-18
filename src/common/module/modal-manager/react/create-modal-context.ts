"use client"

import createModalProvider from "./context"
import { createRegisterModalStore } from "@/src/common/module/modal-manager/core/store"

const createModalContext = () => {
  const localModalStore = createRegisterModalStore()

  return createModalProvider(localModalStore)
}

export const { ModalProvider, modalManager } = createModalContext()
