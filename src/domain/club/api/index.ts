import { cache } from "react"
import KyInstance from "@/src/common/apis/ky-instance"
import { DefaultListResponse } from "@/src/common/types/default-api.type"
import { getURLSearchParamsByObject } from "@/src/common/util/search-params"
import { IdAndTitle } from "@/src/common/util/types/default"
import { ClubListRequestParams, ClubResponse } from "@/src/domain/club/type"

const clubApi = {
  getGenres: cache(async () => {
    const response = await KyInstance.get<DefaultListResponse<IdAndTitle>>("genres?page=1&pageSize=100").json()
    return response
  }),

  getRegions: cache(async () => {
    const response = await KyInstance.get<DefaultListResponse<IdAndTitle>>("regions?page=1&pageSize=100").json()
    return response
  }),

  getClubList: async (params: ClubListRequestParams) => {
    const response = await KyInstance.get<DefaultListResponse<ClubResponse>>(
      `clubs?${getURLSearchParamsByObject(params)}`,
    ).json()

    return response
  },
}

export default clubApi
