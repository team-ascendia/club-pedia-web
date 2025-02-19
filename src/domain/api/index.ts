import kyApi from "@/src/common/apis/ky-api"
import { IUserData } from "@/src/domain/types/user"

const signupApi = {
  signup: async (userData: IUserData) => {
    const response = await kyApi("post", "/api/auth/profile", userData)
    return response
  },
}

export default signupApi
