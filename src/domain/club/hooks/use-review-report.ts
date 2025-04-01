import { useMutation } from "@tanstack/react-query"
import clubApi from "@/src/domain/club/api"

const useReviewReport = () => {
  const reportMutation = useMutation({
    mutationFn: clubApi.reportReview,
  })

  return {
    reportMutation,
  }
}

export default useReviewReport
