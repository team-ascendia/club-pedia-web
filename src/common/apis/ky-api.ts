import { Options } from "ky"
import KyInstance from "@/src/common/apis/ky-instance"

type HttpMethod = "get" | "post" | "put" | "delete"

const kyApi = async (method: HttpMethod, url: string, params?: object | string, config: Options = {}) => {
  try {
    const options: Options = method === "get" ? config : { ...config, json: params }
    const data = await KyInstance[method](url, options).json()
    return data
  } catch (error) {
    throw new Error(`${method.toUpperCase()} 요청 실패: ${error}`)
  }
}

export default kyApi
