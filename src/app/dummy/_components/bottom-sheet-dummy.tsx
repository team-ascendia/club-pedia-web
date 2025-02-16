"use client"

import signBottomSheet from "./sign-bottom-sheet"
import { modalManager } from "@/src/common/module/modal-manager"

const BottomSheetDummy = () => {
  const modalOpen = () => {
    modalManager.open({
      Component: signBottomSheet,
      componentProps: {},
      id: "sign-bottom-sheet",
    })
  }
  return (
    <div className="flex h-screen items-center justify-center bg-cyan-500">
      <button onClick={modalOpen}>modalOpen</button>
    </div>
  )
}

export default BottomSheetDummy
