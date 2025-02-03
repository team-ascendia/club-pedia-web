# Ascendia FrontEnd

|   기술 스택    |  버전  | 비고 |
| :------------: | :----: | :--- |
|     nextJs     | 15.1.6 |
| Tanstack Query |   5    |
|    Zustand     |
|      MSW       |
|    tailwind    |

## 폴더 구조

- common

  - 도메인에 대한 의존성이 없으며 재사용 가능한 것들을 해당 폴더에 만듭니다.

- Domain
  - 해당 폴더는 각 도메인에 해당하는 기능 또는 컴포넌트들을 해당하는 하위 폴더에 만듭니다.

## 함수 선언

- 화살표 함수로 함수를 선언해주세요

```typescript
// EX

const someFu = () => {}
```

## 컴포넌트 선언

컴포넌트는 무조건 export default로 내보내 주세요.

```typescript
// EX

const Component = () => {}

export default Component
```

## API 통신에 사용하는 타입 네이밍 컨벤션

---Request 와 ---Response 로 선언합니다.

```typescript
// EX

interface SomeRequest {}

interface SomeResponse {}
```

## type 파일 네이밍 컨벤션

- type 파일은 some.tpye.ts 로 만듭니다.

## 커밋 컨벤션

| 태그 이름            | 설명                                                               |
| -------------------- | ------------------------------------------------------------------ |
| **Feat**             | 새로운 기능을 추가할 경우                                          |
| **Fix**              | 버그를 고친 경우                                                   |
| **Design**           | CSS 등 사용자 UI 디자인 변경                                       |
| **!BREAKING CHANGE** | 커다란 API 변경의 경우                                             |
| **!HOTFIX**          | 급하게 치명적인 버그를 고쳐야 하는 경우                            |
| **Style**            | 코드 포맷 변경, 세미콜론 누락, 코드 수정이 없는 경우               |
| **Refactor**         | 프로덕션 코드 리팩토링                                             |
| **Comment**          | 필요한 주석 추가 및 변경                                           |
| **Docs**             | 문서를 수정한 경우                                                 |
| **Test**             | 테스트 추가, 테스트 리팩토링 (프로덕션 코드 변경 없음)             |
| **Chore**            | 빌드 태스크 업데이트, 패키지 매니저 설정 (프로덕션 코드 변경 없음) |
| **Rename**           | 파일 혹은 폴더명을 수정하거나 옮기는 작업만 수행한 경우            |
| **Remove**           | 파일을 삭제하는 작업만 수행한 경우                                 |

## 브랜치 전략

- `main`: 안정적인 프로덕션 브랜치
- `dev`: 개발 진행 브랜치
- 기능 개발 및 버그 수정은 `feat/{기능명}`, `fix/{버그명}` 등의 브랜치를 생성하여 작업 후 `dev`로 병합

## 머지 전략

- `dev` 브랜치:

  - **Squash Merge** 사용
  - 여러 커밋을 하나로 합쳐 깔끔한 커밋 히스토리 유지

- `main` 브랜치:
  - **일반 Pull Request Merge** 사용
  - `dev` 브랜치에서 충분한 테스트를 거친 후 `main`으로 병합
  - 기존 커밋 히스토리를 유지하여 변경 사항 추적 가능
