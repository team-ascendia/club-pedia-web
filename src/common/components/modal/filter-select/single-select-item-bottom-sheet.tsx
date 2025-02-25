"use client"

import { FilterRequiredProps, RenderItemProps } from "./type"
import ModalLayout from "@/src/common/components/modal/modal-layout"
import withModalHoc from "@/src/common/components/modal/with-modal-hoc"
import { ModalComponentRequiredProps } from "@/src/common/module/modal-manager"

interface SingleSelectBottomSheetProps<T extends FilterRequiredProps> extends ModalComponentRequiredProps {
  items: T[]
  defaultData?: T
  title: string
  handleSubmit: (data: T) => void
  renderItem: (props: RenderItemProps<T>) => React.JSX.Element
}

const SingleSelectItemBottomSheet = withModalHoc<SingleSelectBottomSheetProps<FilterRequiredProps>>(
  <T extends FilterRequiredProps>({
    close,
    isOpen,
    defaultData,
    handleSubmit,
    items,
    renderItem,
    title,
  }: SingleSelectBottomSheetProps<T>) => {
    const handleItemClick = (item: T) => {
      handleSubmit(item)
      close()
    }

    return (
      <ModalLayout
        withBottomSheetAnimation
        withBottomSheetDragHandler
        isOpen={isOpen}
        close={close}
        className="rounded-t-3 w-full bg-white pb-6"
      >
        <div className="w-full px-6">
          <div className="flex justify-between">
            <div className="size-6" />
            <p className="text-title1">{title}</p>
            <button className="size-6" onClick={() => close()}>
              X
            </button>
          </div>
          <div className="flex flex-col">
            {items.map(item => {
              const active = defaultData?.id === item.id
              return (
                <button className="text-start" key={item.id} onClick={() => handleItemClick(item)}>
                  {renderItem({ active, item })}
                </button>
              )
            })}
          </div>
        </div>
      </ModalLayout>
    )
  },
)

export default SingleSelectItemBottomSheet
