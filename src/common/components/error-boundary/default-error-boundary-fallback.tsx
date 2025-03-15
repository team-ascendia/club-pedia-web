"use client"

import Badge from "@/src/common/components/badge"
import withErrorDataHoc from "@/src/common/components/hocs/club-pedia-error-boundary-hoc"
import { DefaultErrorResponse } from "@/src/common/types/default-api.type"

interface DefaultErrorBoundaryFallbackProps {
  errorData?: DefaultErrorResponse<unknown>
  error: Error
  resetError: () => void
}

const DefaultErrorBoundaryFallback = (props: DefaultErrorBoundaryFallbackProps) => {
  const { errorData, resetError } = props
  switch (errorData?.error.type) {
    case "NOT_SERVER_ERROR_RESPONSE":
    case "UNKOWN_ERROR":
    default:
      return (
        <div className="fixed inset-0 flex h-screen flex-col items-center justify-center bg-white">
          {"에러가 발생하였습니다. 잠시 후 다시 시도하여 주십시오."}
          <Badge onClick={resetError} color="primary" className="text-body4">
            다시 불러오기
          </Badge>
        </div>
      )
  }
}

export default withErrorDataHoc(DefaultErrorBoundaryFallback)
