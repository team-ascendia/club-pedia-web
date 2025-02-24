import { useEffect } from "react"
import useSignup from "@/src/domain/signup/context/signup-context"

const BirthBox = () => {
  const { year, month, day, handleYear, handleMonth, handleDay, setBirthday } = useSignup()

  useEffect(() => {
    if (year.length === 4 && month.length > 0 && day.length > 0) {
      setBirthday()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month, day])

  const handleChange = (type: "year" | "month" | "day", value: string) => {
    if (type === "year") handleYear(value)
    if (type === "month") handleMonth(value)
    if (type === "day") handleDay(value)
  }

  return (
    <div className="rounded-1 flex items-center justify-center gap-x-2 overflow-hidden border border-gray-400 px-1 py-2">
      <input
        value={year}
        onChange={e => handleChange("year", e.target.value)}
        placeholder="YYYY"
        className="w-1/4 min-w-[60px] text-center outline-none"
      />
      <div className="text-gray-400">/</div>
      <input
        value={month}
        onChange={e => handleChange("month", e.target.value)}
        placeholder="MM"
        className="w-1/4 min-w-[50px] text-center outline-none"
      />
      <div className="text-gray-400">/</div>
      <input
        value={day}
        onChange={e => handleChange("day", e.target.value)}
        placeholder="DD"
        className="w-1/4 min-w-[50px] text-center outline-none"
      />
    </div>
  )
}

export default BirthBox
