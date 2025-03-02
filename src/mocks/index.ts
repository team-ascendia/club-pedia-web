export async function initMsw() {
  if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
    const { worker } = await import("./browser")
    worker.start({ onUnhandledRequest: "bypass" })
  }
}
