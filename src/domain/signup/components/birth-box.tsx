import useSignup from "@/src/domain/signup/context/signup-context"

const BirthBox = () => {
  const { year, day, month, handleYear, handleMonth, handleDay } = useSignup()

  return (
    <div className="rounded-1 flex items-center justify-center gap-x-2 overflow-hidden border border-gray-400 px-1 py-2">
      <input
        value={year}
        onChange={e => handleYear(e.target.value)}
        placeholder="YYYY"
        className="w-1/4 min-w-[60px] text-center outline-none"
      />
      <div className="text-gray-400">/</div>
      <input
        value={month}
        onChange={e => handleMonth(e.target.value)}
        placeholder="MM"
        className="w-1/4 min-w-[50px] text-center outline-none"
      />
      <div className="text-gray-400">/</div>
      <input
        value={day}
        onChange={e => handleDay(e.target.value)}
        placeholder="DD"
        className="w-1/4 min-w-[50px] text-center outline-none"
      />
    </div>
  )
}

export default BirthBox
