"use client"

import { ModalComponentRequiredProps } from "@/src/common/module/modal-manager"

type WithModalHocProps<T> = T & ModalComponentRequiredProps

function withModalHoc<T extends object>(Component: React.ComponentType<WithModalHocProps<T>>) {
  return function WrappedComponent(props: WithModalHocProps<T>) {
    const { isOpen, close, ...restProps } = props

    return (
      <div className="fixed inset-0 flex h-screen w-full bg-black/50">
        <div className="relative size-full md:mx-auto md:max-w-[390px]">
          <Component {...(restProps as T)} isOpen={isOpen} close={close} />
        </div>
      </div>
    )
  }
}

export default withModalHoc
