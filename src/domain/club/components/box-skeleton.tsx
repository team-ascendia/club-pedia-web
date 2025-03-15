const EmptyArray = Array.from({ length: 5 })

const BoxSkeleton = () => {
  return (
    <>
      {EmptyArray.map((_, index) => (
        <div key={index} className="z-0 animate-pulse border-b border-gray-300 px-6 py-4">
          <div className="text-title5 h-6 w-3/5 bg-gray-300 text-black" />
          <div className="mt-2.5" />
          <div className="flex h-4 justify-between">
            <div className="text-body6 w-20 bg-gray-300" />
            <div className="text-body6 w-20 bg-gray-300" />
          </div>
          <div className="mt-2.5" />
          <div className="flex gap-4">
            <div className="size-[140px] shrink-0 overflow-hidden rounded bg-gray-300" />
            <div className="flex max-w-[calc(100%-157px)] flex-1 flex-col justify-between gap-5">
              <div className="text-body4 line-clamp-5 h-1/2 w-full bg-gray-300 text-black" />
              <div className="scrollbar-hide flex w-full gap-[5px] overflow-x-scroll">
                <div className="h-8 w-12 shrink-0 rounded-full bg-gray-300" />
                <div className="h-8 w-12 shrink-0 rounded-full bg-gray-300" />
                <div className="h-8 w-12 shrink-0 rounded-full bg-gray-300" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default BoxSkeleton
