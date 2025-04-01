import dayjs from "dayjs"

/**
 * 같은 년도라면 MM.DD - MM.DD 형식으로 반환한다.
 * 다른 년도라면 YY.MM.DD - YY.MM.DD 형식으로 반환한다.
 */
export const formatDateRange = (startDate: string, endDate: string) => {
  const start = dayjs(startDate)
  const end = dayjs(endDate)

  const startYear = start.year()
  const endYear = end.year()

  if (startYear !== endYear) {
    return `${start.format("YY.MM.DD")} - ${end.format("YY.MM.DD")}`
  }

  return `${start.format("MM.DD")} - ${end.format("MM.DD")}`
}

export const formatDate = (props: { date: string; format: string }) => {
  const day = dayjs(props.date)
  return day.format(props.format)
}
