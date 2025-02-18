import { useState } from "react"
import RoundedCheckInput from "@/src/common/components/button/rounded-check-input"
import ModalLayout from "@/src/common/components/modal/modal-layout"
import withModalHoc from "@/src/common/components/modal/with-modal-hoc"
import TermItem from "@/src/domain/sign/components/term-item"
import { TermList, defaultTermState } from "@/src/domain/sign/constants/index "

type UserInfoResponse = {
  email: string
  name: string
  gender: string
  birthday: string
  phone: string

  accessToken: string
  refreshToken: string
}

interface SignBottomSheetProps {
  userInfo: UserInfoResponse
}

const SignBottomSheet = withModalHoc<SignBottomSheetProps>(({ close }) => {
  const [terms, setTerms] = useState(defaultTermState)

  const isAllChecked = Object.values(terms).every(Boolean)
  const disabled = !TermList.filter(({ required }) => required).every(({ name }) => terms[name])

  const checkAll = () => {
    setTerms(Object.fromEntries(Object.keys(terms).map(key => [key, !isAllChecked])))
  }

  const handleClickStart = () => {
    alert("시작~")
  }

  return (
    <ModalLayout
      close={close}
      className="bottom-0 max-h-[90vh] w-full select-none rounded-t-[15px] bg-white px-[25px] pb-[40px] pt-[23px]"
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
