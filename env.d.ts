/** ------------------------------------------------------------------------------
 * 
 * env 타입을 정의하여 코드 작성시 추가 작업이 안들게 하기 위하여 선언합니다.
 * 
 ------------------------------------------------------------------------------ */

declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * @description 백엔드 Base Url
     */
    readonly NEXT_PUBLIC_BASE_API_URL: string

    /**
     * @description
     */
  }
}
