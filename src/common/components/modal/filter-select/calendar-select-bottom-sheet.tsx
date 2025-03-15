import dayjs, { Dayjs } from "dayjs"
import { useState } from "react"
import SelectWarpper from "./select-warpper"
import DateRangePicker from "@/src/common/components/calendar/date-range-picker"
import withModalHoc from "@/src/common/components/modal/hocs/with-modal-hoc"
import ModalLayout from "@/src/common/components/modal/modal-layout"

interface CalendarSelectBottomSheetProps {
  title: string
  handleSubmit: (startDate?: string, endDate?: string) => void
  contentClassName?: string
  defaultStartDate?: string
  defaultEndDate?: string
}

const CalendarSelectBottomSheet = withModalHoc<CalendarSelectBottomSheetProps>(
  ({ close, isOpen, handleSubmit, title, contentClassName, defaultEndDate, defaultStartDate }) => {
    const [date, setDate] = useState({ startDate: defaultStartDate, endDate: defaultEndDate })
    const handleSubmitClick = () => {
      handleSubmit(date.startDate, date.endDate)
      close()
    }

    const handleChangeDate = (startDate?: Dayjs, endDate?: Dayjs) => {
      setDate({ startDate: startDate?.format("YYYY-MM-DD"), endDate: endDate?.format("YYYY-MM-DD") })
    }

    return (
      <ModalLayout withBottomSheetAnimation isOpen={isOpen} close={close} className="rounded-t-3 w-full bg-white py-6">
        <SelectWarpper close={close} handleSubmitClick={handleSubmitClick} title={title}>
          <div className={contentClassName}>
            <DateRangePicker
              onChange={handleChangeDate}
              defaultStartDate={defaultStartDate ? dayjs(date.startDate) : undefined}
              defaultEndDate={defaultEndDate ? dayjs(date.endDate) : undefined}
            />
          </div>
        </SelectWarpper>
      </ModalLayout>
    )
  },
)

export default CalendarSelectBottomSheet
