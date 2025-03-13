"use client"

import ClubListErrorRetry from "@/src/app/club/_components/club-list-error-retry"
import InfiniteScrollList from "@/src/common/components/list/infinite-scroll-list"
import useFilter from "@/src/common/hooks/use-filter"
import EventBox from "@/src/domain/club/[event]/components/event-box"
import useGetEventList from "@/src/domain/club/[event]/hook/use-get-event-list"
import { EventListSearchParams } from "@/src/domain/club/[event]/type"
import BoxSkeleton from "@/src/domain/club/components/box-skeleton"

const EventList = () => {
  const { allSearchParams } = useFilter()
  const eventListQuery = useGetEventList({
    queryKey: ["event", "list", allSearchParams],
    params: allSearchParams as EventListSearchParams,
  })
  return (
    <InfiniteScrollList
      {...eventListQuery}
      render={data => (
        <div className="border-b border-gray-300 px-6 py-4" key={data.id}>
          <EventBox event={data} />
        </div>
      )}
      fallback={<BoxSkeleton />}
      errorFallback={<ClubListErrorRetry error={eventListQuery.error} retry={eventListQuery.fetchNextPage} />}
    />
  )
}

export default EventList
