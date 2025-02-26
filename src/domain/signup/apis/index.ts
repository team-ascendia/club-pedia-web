import ky from "ky"

interface IAuthResponse {
  accessToken: string
  isSignup: boolean
  name: string
  phoneNumber: string
  birthday: string
  gender: string
  email: string
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL

export const socialLogin = async (socialType: string, code: string, redirectUri?: string) => {
  return await ky
    .post(`${baseUrl}/auth/social/${socialType}`, {
      json: { code, redirectUri },
      headers: { Accept: "application/json" },
    })
    .json<IAuthResponse>()
}
