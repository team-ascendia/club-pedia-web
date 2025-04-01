"use client"

import withModalHoc from "@/src/common/components/modal/hocs/with-modal-hoc"
import ModalLayout from "@/src/common/components/modal/modal-layout"
import useReviewReport from "@/src/domain/club/hooks/use-review-report"

interface ReviewReportModalProps {
  id: number
}

const ReviewReportModal = withModalHoc<ReviewReportModalProps>(props => {
  const { close, id, isOpen } = props
  const { reportMutation } = useReviewReport()
  const handleReport = () => {
    reportMutation.mutate(
      { id },
      {
        onSuccess: () => {},
      },
    )
  }
  return (
    <ModalLayout isOpen={isOpen} close={close} className="rounded-t-3 w-full bg-white py-6">
      <button onClick={handleReport}>신고하기</button>
    </ModalLayout>
  )
})

export default ReviewReportModal
