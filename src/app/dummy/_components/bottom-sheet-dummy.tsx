"use client"

import SignBottomSheet from "./sign-bottom-sheet"
import { modalManager } from "@/src/common/module/modal-manager"

const BottomSheetDummy = () => {
  const modalOpen = () => {
    modalManager.open({
      Component: SignBottomSheet,
      componentProps: {
        userInfo: {
          accessToken: "",
          birthday: "",
          email: "",
          gender: "",
          name: "",
          phone: "",
          refreshToken: "",
        },
      },
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
