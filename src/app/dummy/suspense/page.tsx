import Link from "next/link"
import { Suspense } from "react"
import SuspensedServerComponent, { SuspensedServerComponent2 } from "./suspensed-server-component"

const Page = () => {
  return (
    <div>
      <div>서버 컴포넌트 랜더링</div>
      <Suspense fallback={<div>loading...</div>}>
        <SuspensedServerComponent />
      </Suspense>
      <Suspense fallback={<div>로딩이요</div>}>
        <SuspensedServerComponent2 />
      </Suspense>
      <div>test</div>
      <Link href={"/dummy/suspense/more-depth"}>moreDepth</Link>
    </div>
  )
}

export default Page
