// "use client"

import RoundedCheckInput from "@/src/common/components/button/rounded-check-input"
import useSignup from "@/src/domain/sign/context/signup-context"

const GenderBox = () => {
  const { setGender, user } = useSignup()

  return (
    <div className="flex gap-x-12">
      <div className="text-body2 flex items-center gap-x-4">
        <RoundedCheckInput active={user?.gender === "MALE"} name="MALE" onChange={() => setGender("MALE")} />
        남성
      </div>

      <div className="text-body2 flex items-center gap-x-4">
        <RoundedCheckInput active={user?.gender === "FEMALE"} name="FEMALE" onChange={() => setGender("FEMALE")} />
        여성
      </div>
    </div>
  )
}

export default GenderBox
