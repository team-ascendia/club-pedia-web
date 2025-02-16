"use client"

import CircleChecked from "@mui/icons-material/RadioButtonChecked"
import CircleUnchecked from "@mui/icons-material/RadioButtonUnchecked"
import Checkbox from "@mui/material/Checkbox"

interface IGenderProps {
  checked: [boolean, boolean]
  handleChange1: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleChange2: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const GenderBox: React.FC<IGenderProps> = ({ checked, handleChange1, handleChange2 }) => {
  return (
    <div className="flex gap-x-12">
      <div className="flex items-center gap-x-1">
        <Checkbox
          checked={checked[0]}
          onChange={handleChange1}
          icon={<CircleUnchecked style={{ color: "#BDBDBD" }} />}
          checkedIcon={<CircleChecked />}
          sx={{
            "& .MuiSvgIcon-root": { fontSize: 21 },
            "&.Mui-checked": {
              color: "#FF90A1",
            },
          }}
        />
        남성
      </div>
      <div className="flex items-center gap-x-1">
        <Checkbox
          checked={checked[1]}
          onChange={handleChange2}
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
