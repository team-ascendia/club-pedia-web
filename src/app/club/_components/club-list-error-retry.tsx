import { HTTPError } from "ky"
import Badge from "@/src/common/components/badge"
import withErrorDataHoc from "@/src/common/components/hocs/club-pedia-error-boundary-hoc"
import { DefaultErrorResponse } from "@/src/common/types/default-api.type"

interface ClubListErrorRetryProps {
  error: Error | null
  errorData?: DefaultErrorResponse<unknown>
  retry: () => void
}

const ClubListErrorRetry = (props: ClubListErrorRetryProps) => {
  const { error, retry } = props

  if (error instanceof HTTPError) {
    return (
      <div className="flex h-[200px] w-full flex-col items-center justify-center gap-4 border-cyan-500 px-6 py-2">
        <p className="text-title4 whitespace-pre-wrap text-center">{"데이터를 불러오던 중\n에러가 발생하였습니다."}</p>
        <Badge onClick={retry} color="primary" className="text-body4">
          다시 불러오기
        </Badge>
      </div>
    )
  } else {
    return (
      <div className="flex h-[200px] w-full flex-col items-center justify-center gap-4 border-cyan-500 px-6 py-2">
        <p className="text-title4 whitespace-pre-wrap text-center">{"데이터를 불러오던 중\n에러가 발생하였습니다."}</p>
      </div>
    )
  }
}

export default withErrorDataHoc<ClubListErrorRetryProps>(ClubListErrorRetry)
