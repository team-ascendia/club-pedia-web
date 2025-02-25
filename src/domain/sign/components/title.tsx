import useSignup from "@/src/domain/sign/context/signup-context"

interface TitleProps {
  title: string
  index: number
}

const Title: React.FC<TitleProps> = ({ title, index }) => {
  const { filterPages } = useSignup()
  return (
    <div className="mt-4">
      <div className="text-body6 bg-primary-400 flex w-7 items-center justify-center rounded px-[6px] py-[2px] text-white">
        {index + 1}/{filterPages.length}
      </div>
      <div className="text-title1 mb-3 mt-2">{title}</div>
    </div>
  )
}

export default Title
