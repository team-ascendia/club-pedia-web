import { OverlayReducerAction, overlayReducer } from "./reducer"

type ModalId = string

export type CloseHandler = (props: { closeWithRoute?: { url: string } }) => void

export type ModalComponentRequiredProps = {
  close: CloseHandler
  isOpen: boolean
}

type HasRequiredProps<T> = T extends ModalComponentRequiredProps ? T : never

type WithoutModalHandlerProps<T> =
  HasRequiredProps<T> extends never
    ? "props에 ModalComponentRequiredProps가 존재하지 않습니다!"
    : Omit<T, keyof ModalComponentRequiredProps>

type ModalComponent<T> =
  HasRequiredProps<T> extends never
    ? "Component는 props로 ModalComponentRequiredProps를 필수적으로 받아야 합니다."
    : (props: T) => React.JSX.Element | null

export type ModalItem<T> = {
  Component: ModalComponent<T>
  componentProps: WithoutModalHandlerProps<T>
  id: ModalId
  isOpen: boolean
  unmountPromise?: (() => Promise<any>) | null
}

export type ModalData = {
  current: string | null
  modalOrderList: string[]
  modalData: Record<string, ModalItem<unknown>>
}

export const createRegisterModalStore = () => {
  let modalList: ModalData = {
    current: null,
    modalOrderList: [],
    modalData: {},
  }

  let listeners: Array<() => void> = []

  const emitChangeListener = () => {
    for (const listner of listeners) {
      listner()
    }
  }

  const registerOverlaysStore = {
    subscribe(listener: () => void) {
      listeners = [...listeners, listener]

      return () => {
        listeners = listeners.filter(l => l !== listener)
      }
    },
    getSnapshot() {
      return modalList
    },
  }

  const dispatchOverlay = (action: OverlayReducerAction) => {
    modalList = overlayReducer(modalList, action)
    emitChangeListener()
  }

  return { registerOverlaysStore, dispatchOverlay }
}

export type ModalStore = ReturnType<typeof createRegisterModalStore>
