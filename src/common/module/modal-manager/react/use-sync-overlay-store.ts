import { useSyncExternalStore } from "react"
import { ModalStore } from "@/src/common/module/modal-manager/core/store"

const useSyncModalStore = (overlayStore: ModalStore) => {
  const {
    registerOverlaysStore: { subscribe, getSnapshot },
  } = overlayStore

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}

export default useSyncModalStore
