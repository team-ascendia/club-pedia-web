import KyInstance from "@/src/common/apis/ky-instance"
import { AuthResponse, UserDataRequest } from "@/src/domain/types/user"

interface DummyResponse {
  test: string
}

const signApi = {
  signup: async (userData: UserDataRequest) => {
    const response = await KyInstance.post<DummyResponse>("api/auth/profile", {
      json: userData,
    }).json()

    return response
  },
  socialLogin: async (socialType: string, code: string, redirectUri?: string) => {
    const response = await KyInstance.post<AuthResponse>(`auth/social/${socialType}`, {
      json: { code, redirectUri },
      headers: { Accept: "application/json" },
    }).json()

    return response
  },
}

export default signApi
