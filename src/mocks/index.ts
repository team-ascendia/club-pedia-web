export async function initMsw() {
  if (typeof window === "undefined") {
    console.log("서버 환경: MSW 서버(mock server) 실행")
    const { server } = await import("./http")
    server.listen()
  } else {
    console.log("브라우저 환경: MSW worker 실행")
    const { worker } = await import("./browser")
    await worker.start()
  }
}
