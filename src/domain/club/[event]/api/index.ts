import KyInstance from "@/src/common/apis/ky-instance"
import { DefaultListResponse } from "@/src/common/types/default-api.type"
import { getURLSearchParamsByObject } from "@/src/common/util/search-params"
import { EventListRequestParams, EventResponse } from "@/src/domain/club/[event]/type"

const eventApi = {
  getEventList: async (params: EventListRequestParams) => {
    const response = await KyInstance.get<DefaultListResponse<EventResponse>>(
      `events?${getURLSearchParamsByObject(params)}`,
    ).json()
    return response
  },
}

export default eventApi
