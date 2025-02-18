import { type ModalData, type ModalItem } from "./store"

export type OverlayReducerAction =
  | { type: "ADD"; overlay: ModalItem<unknown> }
  | { type: "OPEN"; overlayId: string }
  | { type: "CLOSE"; overlayId: string }
  | { type: "REMOVE"; overlayId: string }
  | { type: "CLOSE_ALL" }
  | { type: "REMOVE_ALL" }

export function overlayReducer(state: ModalData, action: OverlayReducerAction): ModalData {
  switch (action.type) {
    case "ADD": {
      const isExisted = state.modalOrderList.includes(action.overlay.id)

      if (isExisted && state.modalData[action.overlay.id].isOpen === true) {
        throw new Error("You can't open the multiple overlays with the same overlayId. Please set a different id.")
      }

      return {
        current: action.overlay.id,
        /**
         * @description Brings the overlay to the front when reopened after closing without unmounting.
         */
        modalOrderList: [...state.modalOrderList.filter(item => item !== action.overlay.id), action.overlay.id],
        modalData: isExisted
          ? state.modalData
          : {
              ...state.modalData,
              [action.overlay.id]: action.overlay,
            },
      }
    }
    case "OPEN": {
      return {
        ...state,
        modalData: {
          ...state.modalData,
          [action.overlayId]: {
            ...state.modalData[action.overlayId],
            isOpen: true,
          },
        },
      }
    }
    case "CLOSE": {
      const openedModalmodalOrderList = state.modalOrderList.filter(
        orderedOverlayId => state.modalData[orderedOverlayId].isOpen === true,
      )
      const targetIndexInOpenedList = openedModalmodalOrderList.findIndex(item => item === action.overlayId)

      /**
       * @description If closing the last overlay, specify the overlay before it.
       * @description If closing intermediate overlays, specifies the last overlay.
       *
       * @example open - [1, 2, 3, 4]
       * close 2 => current: 4
       * close 4 => current: 3
       * close 3 => current: 1
       * close 1 => current: null
       */
      const currentOverlayId =
        targetIndexInOpenedList === openedModalmodalOrderList.length - 1
          ? (openedModalmodalOrderList[targetIndexInOpenedList - 1] ?? null)
          : (openedModalmodalOrderList.at(-1) ?? null)

      return {
        ...state,
        current: currentOverlayId,
        modalData: {
          ...state.modalData,
          [action.overlayId]: {
            ...state.modalData[action.overlayId],
            isOpen: false,
          },
        },
      }
    }
    case "REMOVE": {
      const remainingOverlays = state.modalOrderList.filter(item => item !== action.overlayId)
      if (state.modalOrderList.length === remainingOverlays.length) {
        return state
      }

      const copiedModalData = { ...state.modalData }
      delete copiedModalData[action.overlayId]

      const current = state.current
        ? remainingOverlays.includes(state.current)
          ? /**
             * @description If `unmount` was executed after `close`
             */
            state.current
          : /**
             * @description If you only run `unmount`, there is no `current` in `remainingOverlays`
             */
            (remainingOverlays.at(-1) ?? null)
        : /**
           * @description The case where `current` is `null`
           */
          null

      return {
        current,
        modalOrderList: remainingOverlays,
        modalData: copiedModalData,
      }
    }
    case "CLOSE_ALL": {
      return {
        ...state,
        modalData: Object.keys(state.modalData).reduce(
          (prev, curr) => ({
            ...prev,
            [curr]: {
              ...state.modalData[curr],
              isOpen: false,
            } as ModalItem<unknown>,
          }),
          {} satisfies Record<string, ModalItem<unknown>>,
        ),
      }
    }
    case "REMOVE_ALL": {
      return { current: null, modalOrderList: [], modalData: {} }
    }
  }
}
