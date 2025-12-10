
```bash
pnpm install

pnpm dev

```
배포링크 : https://directional-git-main-josunkims-projects.vercel.app
react 
nextjs
chakra-ui 스타일 라이브러리 
react-query
axios
s-cookie

- **게시글 작성 / 조회 / 삭제 (CRUD)**
- 무한 스크롤 기반 페이지네이션
- **금칙어 필터**: 아래 단어 포함 시 등록 불가`"캄보디아"`, `"프놈펜"`, `"불법체류"`, `"텔레그램"`
**(1) 바 차트, 도넛 차트 (`/mock/weekly-mood-trend`, `/mock/popular-snack-brands`)**

- 각 데이터 별로 두 가지 차트, 총 4개 차트 구현

**(2) 스택형 바 / 면적 차트 (`/mock/weekly-mood-trend`, `/mock/weekly-workout-trend`)**

- X축: `week`
- Y축: 백분율(%)
- `/mock/weekly-mood-trend` 각 항목(`happy`, `tired`, `stressed`)이 누적(Stacked) 형태로 표시
- `/mock/weekly-workout-trend` 각 항목(`running`, `cycling`, `stretching`)이 누적(Stacked) 형태로 표시
- 각 데이터 별로 두 가지 차트, 총 4개 차트 구현

**(3) 멀티라인 차트 (`/mock/coffee-consumption`, 

- X축: 커피 섭취량(잔/일), 스낵 수
- 왼쪽 Y축: 버그 수(`bugs`), 회의불참(`meetingMissed`)
- 오른쪽 Y축: 생산성 점수(`productivity`), 사기(`morale`)
- 범례(Legend): 팀별 라인 구분
- 각 팀(Frontend, Backend, AI 등)에 대해 **두 개의 라인** 표시
    - 실선: 버그 수, 회의불참
    - 점선: 생산성, 사기
    - 동일 팀은 동일 색상 유지
- 각 데이터 별로 차트 구현
