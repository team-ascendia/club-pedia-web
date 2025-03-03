import CircleChecked from "@mui/icons-material/RadioButtonChecked"
import CircleUnchecked from "@mui/icons-material/RadioButtonUnchecked"
import Checkbox from "@mui/material/Checkbox"
import useSignup from "@/src/domain/sign/context/signup-context"

const GenderBox = () => {
  const { setGender, user } = useSignup()

  return (
    <div className="flex gap-x-12">
      <div className="text-body2 flex items-center gap-x-1">
        <Checkbox
          checked={user?.gender === "MALE"}
          onChange={() => setGender("MALE")}
          icon={<CircleUnchecked style={{ color: "#BDBDBD" }} />}
          checkedIcon={<CircleChecked />}
          sx={{
            "& .MuiSvgIcon-root": { fontSize: 21 },
            "&.Mui-checked": {
              color: "rgb(255, 144, 161)",
            },
          }}
        />
        남성
      </div>

      <div className="text-body2 flex items-center gap-x-1">
        <Checkbox
          checked={user?.gender === "FEMALE"}
          onChange={() => setGender("FEMALE")}
          icon={<CircleUnchecked style={{ color: "#BDBDBD" }} />}
          checkedIcon={<CircleChecked />}
          sx={{
            "& .MuiSvgIcon-root": {
              fontSize: 22,
            },
            "&.Mui-checked": {
              color: "#FF90A1",
            },
          }}
        />
        여성
      </div>
    </div>
  )
}

export default GenderBox
