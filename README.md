# YouTube

- react와 유튜브 API를 이용하여 구현한 유튜브 클론코딩
- Demo : [YouTube](https://youtube-lani.vercel.app/)

## 기능

- 데스크탑, 태블릿, 모바일 버전에서 확인할 수 있는 반응형 웹
- React Router를 사용하여 메인/검색/상세 등의 각 페이지로 이동
- 유튜브 API를 이용하여 인기있는 동영상 목록 제공 및 관련 카테고리 동영상 추천, 키워드 검색 기능 구현
- Axios를 이용하여 크로스 브라우징 및 에러 핸들링 강화
- Context API를 만들어 유튜브 API의 실제 서비스 환경과 개발환경을 구분하여 관리
- useInfiniteQuery()와 react-intersection-observer를 이용하여 무한 스크롤 구현
- dark/light 모드 구현
- 로딩 스켈레톤 구현
- 상세 페이지 동영상 설명
  - 더보기/간략히 기능 구현
  - URL/태그/타임스탬프 클릭 구현

## 사용 기술

### 기술

- Tailwind (v3.3.3)
- JavaScript
- React

### 라이브러리

- Axios (v1.5.0)
- React Router (v6.15.0)
- TanStack Query (v4.33.0)
- React Icons (v4.10.1)
- timeago.js (v4.0.2)
- [react-intersection-observer (v9.5.2)](https://www.npmjs.com/package/react-intersection-observer)
- [react-youtube (v10.1.0)](https://github.com/tjallingt/react-youtube)

### API

- [YouTube Data API](https://developers.google.com/youtube/v3/docs)
- [YouTube IFrame Player API](https://developers.google.com/youtube/iframe_api_reference)

### 테스트

- Jest
- Testing Library
- Cypress (v13.1.0)

### 배포

- Vercel

## 개선사항

- 상세페이지 채널 이미지 URL을 가져오지 못한 경우, 채널 명 앞글자를 따서 이미지로 제공
- 네트워크 연결이 안되었을 경우 등의 에러 상황 처리
- 상세페이지 관련 비디오들 로딩시 스켈레톤 대신 스피너를 사용하도록 변경
- 최근 검색어 기능 구현
