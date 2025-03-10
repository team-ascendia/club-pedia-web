import { generateListMockData } from "@/src/common/util/mock"
import { EventListRequestParams } from "@/src/domain/club/[event]/type"

const eventApi = {
  getEventList: async (params: EventListRequestParams) => {
    return generateListMockData({
      pagination: {
        page: params.page,
        size: params.pageSize,
        totalItems: 81,
      },
      resolver: index => {
        return {
          id: index,
          title: `event-${index + 1}`,
          thumbnailImageUrl: undefined,
          startDate: "2023-01-01",
          endDate: "2023-01-02",
          summary: "summary",
          club: { id: 1, title: "W클럽" },
          region: { id: 1, title: "화양동" },
          genres: [
            { id: 1, title: "EDM" },
            { id: 2, title: "힙합" },
          ],
        }
      },
    })
  },
}

export default eventApi
