"use client"

import dayjs, { Dayjs } from "dayjs"
import React, { useState } from "react"
import { ArrowLeftIcon } from "@/public/icons"
import cn from "@/src/common/util/cn"

interface CalendarRangeProps {
  defaultStartDate?: Dayjs
  defaultEndDate?: Dayjs
  onChange: (start: Dayjs, end: Dayjs) => void
}

const WeekDays = ["일", "월", "화", "수", "목", "금", "토"]

const _getCalendarDays = (year: number, month: number): (Dayjs | null)[] => {
  const days: (Dayjs | null)[] = []
  const firstDay = dayjs(new Date(year, month, 1))
  const startDay = firstDay.day()
  for (let i = 0; i < startDay; i++) {
    days.push(null)
  }
  const lastDate = dayjs(new Date(year, month + 1, 0)).date()
  for (let d = 1; d <= lastDate; d++) {
    days.push(dayjs(new Date(year, month, d)))
  }
  return days
}

const CalendarRange: React.FC<CalendarRangeProps> = ({ defaultStartDate, defaultEndDate, onChange }) => {
  const today = dayjs()
  const initialDate = defaultStartDate ?? today

  const [startDate, setStartDate] = useState<Dayjs | null>(defaultStartDate ?? null)
  const [endDate, setEndDate] = useState<Dayjs | null>(defaultEndDate ?? null)

  const [selectingStart, setSelectingStart] = useState<boolean>(true)

  const [year, setYear] = useState<number>(initialDate.year())
  const [month, setMonth] = useState<number>(initialDate.month())

  const calendarDays = _getCalendarDays(year, month)

  const handlePrevMonth = () => {
    if (month === 0) {
      setYear(year - 1)
      setMonth(11)
    } else {
      setMonth(month - 1)
    }
  }

  const handleNextMonth = () => {
    if (month === 11) {
      setYear(year + 1)
      setMonth(0)
    } else {
      setMonth(month + 1)
    }
  }

  const handleDateClick = (clicked: Dayjs) => {
    if (selectingStart) {
      setStartDate(clicked)
      setEndDate(null)
      setSelectingStart(false)
    } else {
      if (startDate) {
        if (clicked.isBefore(startDate, "day")) {
          setStartDate(clicked)
          setEndDate(startDate)
          onChange(clicked, startDate)
        } else {
          setEndDate(clicked)
          onChange(startDate, clicked)
        }
      }

      setSelectingStart(true)
    }
  }

  const isInRange = (day: Dayjs): boolean => {
    if (!startDate || !endDate) return false
    return (
      (day.isAfter(startDate) || day.isSame(startDate, "day")) && (day.isBefore(endDate) || day.isSame(endDate, "day"))
    )
  }

  const isSameDay = (d1: Dayjs, d2: Dayjs): boolean => d1.isSame(d2, "day")

  return (
    <div className="flex w-full flex-col gap-[22px]">
      <div className="mx-auto flex h-6 w-[160px] items-center justify-between">
        <button onClick={handlePrevMonth} className="shrink-0 text-gray-600">
          <ArrowLeftIcon className="size-4  text-gray-600" />
        </button>
        <p className="text-title6 mt-1 text-gray-800">
          {year}년 {month + 1}월
        </p>
        <button onClick={handleNextMonth} className="shrink-0 text-gray-600">
          <ArrowLeftIcon className="size-4 rotate-180 text-gray-600 " />
        </button>
      </div>

      <div className="text-body6 grid grid-cols-7 ">
        {WeekDays.map(wd => (
          <div key={wd} className="mx-auto h-5 w-[30px] text-center text-gray-600">
            {wd}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 items-center justify-center gap-y-2">
        {calendarDays.map((day, idx) => {
          if (!day) return <div key={idx} className="py-2" />
          const inRange = isInRange(day)
          const selectedStart = startDate ? isSameDay(day, startDate) : false
          const selectedEnd = endDate ? isSameDay(day, endDate) : false

          return (
            <div key={day.toISOString() + idx} className="flex size-full h-[30px] items-center justify-center">
              <button
                onClick={() => handleDateClick(day)}
                className={cn("py-2 flex items-center justify-center size-full ", {
                  "bg-primary-300 text-white": inRange,
                  "bg-primary-500 text-white": selectedStart || selectedEnd,
                  "rounded-l-full": selectedStart && endDate,
                  "rounded-full size-[30px]": selectedStart && !endDate,
                  "rounded-r-full": selectedEnd,
                })}
              >
                <p
                  className={cn("text-body1", {
                    "text-title6": selectedStart || selectedEnd,
                  })}
                >
                  {day.date()}
                </p>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CalendarRange
