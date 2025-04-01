"use client"

import OotdCard from "@/src/domain/club/components/ootd-card"

const DUMMY_ARRAY = new Array(10).fill(0)

const ClubOotd = () => {
  return (
    <div className="grid w-full grid-cols-3 flex-wrap place-items-center justify-start gap-1.5 px-6 py-[22px]">
      {DUMMY_ARRAY.map((_, index) => (
        <OotdCard key={index} />
      ))}
    </div>
  )
}

export default ClubOotd
