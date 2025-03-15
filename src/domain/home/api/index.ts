import KyInstance from "@/src/common/apis/ky-instance"
import { ContentListResponse, PostListResponse } from "@/src/domain/types/home"

const fetchList = async <T>(endpoint: string, params: Record<string, string>) => {
  const response = await KyInstance.get(endpoint, {
    searchParams: params,
  }).json<T>()
  return response
}

const homeApi = {
  clubList: () =>
    fetchList<ContentListResponse>(`clubs`, {
      order: "popular",
      requestTime: new Date().toISOString(),
    }),
  eventList: () => fetchList<ContentListResponse>(`events`, { order: "popular" }),
  popularList: () => fetchList<PostListResponse>(`posts`, { order: "popular" }),
}

export default homeApi
