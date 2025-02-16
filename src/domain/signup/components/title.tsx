import useSignup from "@/src/domain/signup/context/signup-context"

interface TitleProps {
  title: string
  index: number
}

const Title: React.FC<TitleProps> = ({ title, index }) => {
  const { filterPages } = useSignup()
  return (
    <div className="mt-4">
      <div className="bg-primary-400 flex w-7 items-center justify-center rounded px-[6px] py-[2px] text-xs text-white">
        {index + 1}/{filterPages.length}
      </div>
      <div className="mb-3 mt-2 text-2xl font-semibold">{title}</div>
    </div>
  )
}

export default Title
