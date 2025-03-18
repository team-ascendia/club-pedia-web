// import { HttpResponse, http } from "msw"

// const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL

// 🔹 API 요청 핸들러
// const apiHandlers = [
//   http.post(`${baseUrl}/auth/social/kakao`, async ({ request }) => {
//     const body = (await request.json()) as { code: string; redirectUri: string }

//     if (body.code && body.redirectUri) {
//       return HttpResponse.json(
//         {
//           accessToken: "mock_access_token",
//           isSignup: false,
//           name: "홍길동",
//           phoneNumber: "010-1234-5678",
//           birthday: "1990-01-01",
//           gender: "MALE",
//           email: "hong@example.com",
//         },
//         { status: 204 },
//       )
//     } else {
//       return HttpResponse.json({ error: "Invalid request body" }, { status: 400 })
//     }
//   }),
// ]

// 🔹 정적 리소스 요청 무시 핸들러
// const staticHandlers = [
//   http.all("*", () => {
//     return new HttpResponse(null, { status: 404 })
//   }),
// ]

// 📢 최종 핸들러 배열
// export const handlers = [...apiHandlers]

export const handlers = []
