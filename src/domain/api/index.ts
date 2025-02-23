import KyInstance from "@/src/common/apis/ky-instance"
import { IUserData } from "@/src/domain/types/user"

interface DummyResponse {
  test: string
}

const signApi = {
  signup: async (userData: IUserData) => {
    const response = await KyInstance.post<DummyResponse>("/api/auth/profile", {
      json: userData,
    }).json()

    return response
  },
}

export default signApi
