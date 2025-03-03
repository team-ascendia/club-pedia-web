import KyInstance from "@/src/common/apis/ky-instance"
import { ContentListResponse } from "@/src/domain/types/home"

const fetchList = async <T>(endpoint: string, order: string = "popular") => {
  const response = await KyInstance.get(endpoint, {
    searchParams: { order },
  }).json<T>()
  return response
}

const homeApi = {
  clubList: () => fetchList<ContentListResponse>(`clubs`),
  eventList: () => fetchList<ContentListResponse>(`events`),
  popularList: () => fetchList(`posts`),
}

export default homeApi
