import { useMutation } from "@tanstack/react-query"
import { setCookie } from "cookies-next/client"
import { useState } from "react"
import RoundedCheckInput from "@/src/common/components/button/rounded-check-input"
import withModalHoc from "@/src/common/components/modal/hocs/with-modal-hoc"
import ModalLayout from "@/src/common/components/modal/modal-layout"
import { User } from "@/src/common/types/user"
import signApi from "@/src/domain/sign/api"
import TermItem from "@/src/domain/sign/components/term-item"
import { TermList, TermNames, defaultTermState } from "@/src/domain/sign/constants/index "
import { MemberActivationRequest } from "@/src/domain/sign/type"

interface SignBottomSheetProps {
  userInfo: User
}

const SignBottomSheet = withModalHoc<SignBottomSheetProps>(({ close, userInfo, isOpen }) => {
  const [terms, setTerms] = useState(defaultTermState)

  const isAllChecked = Object.values(terms).every(Boolean)
  const disabled = !TermList.filter(({ required }) => required).every(({ name }) => terms[name])

  const checkAll = () => {
    const newTerms = { ...terms }
    Object.keys(newTerms).forEach(key => {
      newTerms[key as TermNames] = !isAllChecked
    })
    setTerms(newTerms)
  }

  const memberActivation = useMutation({
    mutationFn: signApi.memberActivation,
  })

  const handleClickStart = () => {
    const { accessToken, ...rest } = userInfo

    const request: MemberActivationRequest = {
      ...rest,
      ...terms,
    }
    memberActivation.mutate(
      {
        request: request,
        accessToken,
      },
      {
        onSuccess: () => {
          setCookie("accessToken", accessToken)
          close({
            closeWithRoute: {
              url: "/",
            },
          })
        },
      },
    )
  }

  return (
    <ModalLayout
      withBottomSheetAnimation
      isOpen={isOpen}
      close={close}
      className="max-h-[90vh] w-full select-none rounded-t-[15px] bg-white px-[25px] pb-[40px] pt-[23px]"
    >
      <div className="flex flex-col items-center gap-[29px]">
        <p className="text-title1">약관동의</p>
        <div className="mx-[400px] flex h-[58px] w-full flex-row items-center gap-4 rounded-[5px] border-[0.5px] py-[5px] pl-4">
          <RoundedCheckInput onClick={checkAll} name="checkAll" active={isAllChecked} />
          <p className="text-body2">모두 동의합니다.</p>
        </div>

        <div className="text-body6 relative flex max-h-[55vh] w-full flex-1 flex-col gap-5 overflow-y-scroll">
          {TermList.map(({ name, required, term, title }) => (
            <TermItem
              key={name}
              term={term}
              title={title}
              required={required}
              active={terms[name]}
              handleChangeActive={() =>
                setTerms(prev => ({
                  ...prev,
                  [name]: !prev[name],
                }))
              }
            />
          ))}
        </div>
        <button
          className="bg-primary-400 text-title6 rounded-2 h-[52px] w-full text-white transition-all disabled:bg-gray-300 disabled:hover:cursor-not-allowed"
          disabled={disabled}
          onClick={handleClickStart}
        >
          클럽피디아 시작하기
        </button>
      </div>
    </ModalLayout>
  )
})

export default SignBottomSheet
