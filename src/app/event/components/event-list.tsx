"use client"

import ClubListErrorRetry from "@/src/app/club/_components/club-list-error-retry"
import InfiniteScrollList from "@/src/common/components/list/infinite-scroll-list"
import useFilter from "@/src/common/hooks/use-filter"
import EventBox from "@/src/domain/club/[event]/components/event-box"
import useGetEventList from "@/src/domain/club/[event]/hook/use-get-event-list"
import { EventListSearchParams } from "@/src/domain/club/[event]/type"
import BoxSkeleton from "@/src/domain/club/components/box-skeleton"

// const mockData = [
//   {
//     id: 1,
//     title: "Skrr 파티",
//     thumbnailImageUrl: undefined,
//     startDate: "2025-01-01",
//     endDate: "2025-01-05",
//     summary: "Skrr Party는 인기 아티스트들과 함께하는 클럽 이벤트입니다.",
//     club: { id: 1, title: "W클럽" },
//     region: { id: 1, title: "화양동" },
//     genres: [
//       { id: 1, title: "EDM" },
//       { id: 2, title: "힙합" },
//     ],
//   },
//   {
//     id: 2,
//     title: "Deep House Night",
//     thumbnailImageUrl: undefined,
//     startDate: "2025-02-10",
//     endDate: "2025-02-12",
//     summary: "딥하우스 장르의 감성적인 밤을 위한 클럽 이벤트입니다.",
//     club: { id: 2, title: "X클럽" },
//     region: { id: 2, title: "강남" },
//     genres: [{ id: 3, title: "Deep House" }],
//   },
//   {
//     id: 3,
//     title: "Trap & Bass Festival",
//     thumbnailImageUrl: undefined,
//     startDate: "2025-03-05",
//     endDate: "2025-03-07",
//     summary: "강렬한 트랩과 베이스 사운드를 즐길 수 있는 페스티벌.",
//     club: { id: 3, title: "H클럽" },
//     region: { id: 3, title: "홍대" },
//     genres: [
//       { id: 4, title: "Trap" },
//       { id: 5, title: "Bass" },
//     ],
//   },
//   {
//     id: 4,
//     title: "Retro Wave Party",
//     thumbnailImageUrl: undefined,
//     startDate: "2025-04-15",
//     endDate: "2025-04-16",
//     summary: "복고풍 신스웨이브 음악과 함께하는 특별한 파티.",
//     club: { id: 4, title: "V클럽" },
//     region: { id: 4, title: "이태원" },
//     genres: [{ id: 6, title: "Synthwave" }],
//   },
//   {
//     id: 5,
//     title: "K-HipHop Night",
//     thumbnailImageUrl: undefined,
//     startDate: "2025-05-20",
//     endDate: "2025-05-21",
//     summary: "국내 최고의 힙합 아티스트들과 함께하는 밤.",
//     club: { id: 5, title: "M클럽" },
//     region: { id: 5, title: "강남" },
//     genres: [{ id: 2, title: "힙합" }],
//   },
//   {
//     id: 6,
//     title: "Techno Madness",
//     thumbnailImageUrl: undefined,
//     startDate: "2025-06-10",
//     endDate: "2025-06-12",
//     summary: "최고의 테크노 DJ들이 선사하는 미친 듯한 밤.",
//     club: { id: 6, title: "T클럽" },
//     region: { id: 6, title: "홍대" },
//     genres: [{ id: 7, title: "Techno" }],
//   },
//   {
//     id: 7,
//     title: "Latin Groove",
//     thumbnailImageUrl: undefined,
//     startDate: "2025-07-05",
//     endDate: "2025-07-06",
//     summary: "라틴 음악과 함께하는 뜨거운 클럽 파티.",
//     club: { id: 7, title: "L클럽" },
//     region: { id: 7, title: "신촌" },
//     genres: [
//       { id: 8, title: "Latin" },
//       { id: 9, title: "Reggaeton" },
//     ],
//   },
//   {
//     id: 8,
//     title: "House & Funky Night",
//     thumbnailImageUrl: undefined,
//     startDate: "2025-08-18",
//     endDate: "2025-08-19",
//     summary: "펑키한 하우스 음악과 함께하는 신나는 밤.",
//     club: { id: 8, title: "F클럽" },
//     region: { id: 8, title: "이태원" },
//     genres: [{ id: 10, title: "House" }],
//   },
//   {
//     id: 9,
//     title: "Psytrance Journey",
//     thumbnailImageUrl: undefined,
//     startDate: "2025-09-23",
//     endDate: "2025-09-25",
//     summary: "사이키델릭한 트랜스 음악과 함께하는 여행.",
//     club: { id: 9, title: "P클럽" },
//     region: { id: 9, title: "강남" },
//     genres: [{ id: 11, title: "Psytrance" }],
//   },
//   {
//     id: 10,
//     title: "RnB & Soul Night",
//     thumbnailImageUrl: undefined,
//     startDate: "2025-10-10",
//     endDate: "2025-10-11",
//     summary: "감미로운 R&B와 소울 음악이 함께하는 낭만적인 밤.",
//     club: { id: 10, title: "S클럽" },
//     region: { id: 10, title: "홍대" },
//     genres: [{ id: 12, title: "R&B" }],
//   },
// ]

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
