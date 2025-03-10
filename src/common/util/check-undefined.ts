/**
 * 객체(및 중첩 객체) 내 모든 속성이 undefined인지 확인하는 함수
 * @param obj 검사할 객체(또는 값)
 * @returns 모든 속성이 undefined이면 true, 그렇지 않으면 false
 */
export const isAllUndefined = (obj: unknown) => {
  // 1) obj가 undefined이면 바로 true
  if (obj === undefined || typeof window === "undefined") {
    return true
  }

  // 2) null이거나 객체 타입이 아니면(예: number, string 등) -> undefined가 아님
  if (obj === null || typeof obj !== "object") {
    return false
  }

  // 3) 배열 또는 일반 객체를 순회하며 검사
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = (obj as Record<string, unknown>)[key]
      // - 중첩 객체(또는 배열)면 재귀 호출
      if (typeof value === "object" && value !== null) {
        if (!isAllUndefined(value)) {
          return false
        }
      }
      // - 기본 값인데 undefined가 아니라면 false
      else if (value !== undefined) {
        return false
      }
    }
  }

  // 4) 모든 속성이 undefined였으면 true
  return true
}
