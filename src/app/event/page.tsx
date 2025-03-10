import { QueryClient } from "@tanstack/react-query"
import { Suspense } from "react"
import EventFilterList from "./components/event-filter-list"
import EventList from "./components/event-list"
import { ClubPediaErrorBoundary } from "@/src/common/components/error-boundary/club-pedia-error-boundray"
import DefaultErrorBoundaryFallback from "@/src/common/components/error-boundary/default-error-boundary-fallback"
import BottomNavigation from "@/src/common/components/layout/bottom-navigation"
import HeaderWithBackButton from "@/src/common/components/layout/header-with-back-button"
import { DEFAULT_QUERY_STALE_TIME } from "@/src/common/util/tanstack-query/get-query-client"
import PrefetchBoundary from "@/src/common/util/tanstack-query/prefetch-suspense"
import eventApi from "@/src/domain/club/[event]/api"
import { EventListSearchParams } from "@/src/domain/club/[event]/type"
import BoxSkeleton from "@/src/domain/club/components/box-skeleton"

const EventPage = async ({ searchParams }: { searchParams: Promise<EventListSearchParams> }) => {
  const searchParamsResult = await searchParams

  const eventPrefetch = async (qc: QueryClient) => {
    await qc.prefetchInfiniteQuery({
      queryKey: ["event", "list", searchParamsResult],
      queryFn: ({ pageParam }) => eventApi.getEventList({ ...searchParamsResult, page: pageParam, pageSize: 10 }),
      initialPageParam: 1,
      staleTime: DEFAULT_QUERY_STALE_TIME,
    })
  }

  return (
    <div className="relative mb-[var(--footer-nav-height)]">
      <HeaderWithBackButton title="Event" sticky />
      <Suspense>
        <div className="scrollbar-hide sticky top-[var(--header-height)] box-border flex h-12 flex-nowrap gap-2.5 overflow-x-scroll bg-white px-6 py-2">
          <EventFilterList />
        </div>
      </Suspense>
      <PrefetchBoundary fallback={<BoxSkeleton />} prefetchList={[eventPrefetch]}>
        <ClubPediaErrorBoundary fallback={DefaultErrorBoundaryFallback}>
          <EventList />
        </ClubPediaErrorBoundary>
      </PrefetchBoundary>

      <BottomNavigation />
    </div>
  )
}

export default EventPage
