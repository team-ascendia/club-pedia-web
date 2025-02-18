import { getCookie } from "cookies-next"
import ky from "ky"

const KyInstance = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  hooks: {
    beforeRequest: [
      request => {
        const token = getCookie("accessToken")

        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`)
        }
      },
    ],
  },
})
export default KyInstance
