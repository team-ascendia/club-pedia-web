import { HttpResponse, http } from "msw"

export const handlers = [
  http.get("/", () => {
    return HttpResponse.json({ message: "MSW 연결 성공!" })
  }),
]
