"use client"
import { HTTPError } from "ky"
import { useEffect, useState } from "react"
import { DefaultErrorResponse } from "@/src/common/types/default-api.type"

type ErrorProps<T> = {
  error: Error | null
  errorData?: DefaultErrorResponse<unknown>
} & T

export const convertClubPediaErrorWhenIsNotServerError = (error: unknown): DefaultErrorResponse<unknown> => {
  if (!(error instanceof Object)) {
    return {
      error: {
        type: "UNKOWN_ERROR",
        message: "에러가 발생하였습니다. 잠시 후 다시 시도하여 주세요.",
        details: error,
      },
    }
  }

  if (Object.hasOwn(error, "error")) {
    const missingKeys = ["type", "message", "details"].some(key => !Object.hasOwn(error, key))
    return missingKeys
      ? {
          error: {
            type: "NOT_SERVER_ERROR_RESPONSE",
            message: "에러가 발생하였습니다. 잠시 후 다시 시도하여 주세요.",
            details: error,
          },
        }
      : (error as DefaultErrorResponse<unknown>)
  }

  return error as DefaultErrorResponse<unknown>
}

const withErrorDataHoc = <T extends object>(ErrorFallbackComponent: React.ComponentType<ErrorProps<T>>) => {
  return function WrappedComponent(props: Omit<ErrorProps<T>, "errorData">) {
    const { error, ...rest } = props
    const [errorData, setErrorData] = useState<DefaultErrorResponse<unknown>>()
    useEffect(() => {
      if (!error) return

      const getErrorData = async () => {
        if (!(error instanceof HTTPError)) return

        const result = (await error.response.json()) as DefaultErrorResponse<unknown>

        const convertedErrorData = convertClubPediaErrorWhenIsNotServerError(result)

        setErrorData(convertedErrorData)
      }

      getErrorData()
    }, [])

    return <ErrorFallbackComponent errorData={errorData} error={error} {...(rest as T)} />
  }
}

export default withErrorDataHoc
