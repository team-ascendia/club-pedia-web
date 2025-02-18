import { Options } from "ky"
import KyInstance from "./ky-instance"

export const kyGet = async (url: string, config: Options = {}) => {
  const data = await KyInstance.get(url, config).json()
  return data
}

type HttpMethod = "post" | "put" | "delete"

export const kyRequest = async (
  method: HttpMethod,
  url: string,
  params: object | string = {},
  config: Options = {},
) => {
  try {
    const data = await KyInstance[method](url, { ...config, json: params }).json()
    return data
  } catch (error) {
    throw new Error(`${method.toUpperCase()} 요청 실패: ${error}`)
  }
}
