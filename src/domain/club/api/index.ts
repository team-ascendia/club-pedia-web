import { cache } from "react"
import KyInstance from "@/src/common/apis/ky-instance"
import { DefaultListResponse } from "@/src/common/types/default-api.type"
import { getURLSearchParamsByObject } from "@/src/common/util/search-params"
import { IdAndTitle } from "@/src/common/util/types/default"
import { ClubListRequestParams, ClubResponse } from "@/src/domain/club/type"

// const mockData = {
//   genres: {
//     pagination: {
//       page: 1,
//       size: 100,
//       totalItems: 4,
//       totalPages: 1,
//     } as PaginationResponse,
//     items: [
//       { id: 1, title: "Jazz" },
//       { id: 2, title: "Rock" },
//       { id: 3, title: "Hip-Hop" },
//       { id: 4, title: "Pop" },
//     ],
//   },
//   regions: {
//     pagination: {
//       page: 1,
//       size: 100,
//       totalItems: 4,
//       totalPages: 1,
//     } as PaginationResponse,
//     items: [
//       { id: 1, title: "신사동" },
//       { id: 2, title: "청담동" },
//       { id: 3, title: "압구정동" },
//       { id: 4, title: "이태원동" },
//     ],
//   },
// }

const clubApi = {
  getGenres: cache(async () => {
    const response = await KyInstance.get<DefaultListResponse<IdAndTitle>>("genres?page=1&pageSize=100").json()
    return response
  }),

  getRegions: cache(async () => {
    const response = await KyInstance.get<DefaultListResponse<IdAndTitle>>("regions?page=1&pageSize=100").json()
    return response

    // return mockData.regions
  }),

  getClubList: async (params: ClubListRequestParams) => {
    const response = await KyInstance.get<DefaultListResponse<ClubResponse>>(
      `clubs?${getURLSearchParamsByObject(params)}`,
    ).json()
    return response
  },
}

export default clubApi
