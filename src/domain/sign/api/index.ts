import KyInstance from "@/src/common/apis/ky-instance"
import { AuthResponse, User } from "@/src/common/types/user"

const signApi = {
  memberActivation: async (props: { request: Omit<User, "accessToken">; accessToken: string }) => {
    const { accessToken, request } = props
    const response = await KyInstance.post("member/activation", {
      json: request,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
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
