# 이슈 트래킹 툴

배포주소 :
<a href="[https://pre-onboarding-8th-2week-6.vercel.app/](https://pre-onboarding-8th-2week-6.vercel.app/)">[https://vercel.com/lee-yo-han/pre-onboarding-8th-2week-6](https://pre-onboarding-8th-2week-6.vercel.app/)</a>

## 6조

### Team

- 김태훈(팀장)
- 김민정
- 김종이
- 송지현
- 이상현
- 이요한
- 이조은

### Local Start

<br>

```bash
# yarn
yarn install
```

```bash
# local DB
yarn json-server --watch db.json --port 3001
```

```bash
# start project
yarn start
```

<h3 align="center">🛠Used Tools🛠</h3>

<div align="center" >
    <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/>
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=JavaScript&logoColor=white"/>
    <img src="https://img.shields.io/badge/Redux-61DAFB?style=flat&logo=Redux&logoColor=white"/>
    <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=Axios&logoColor=white"/>    
</div>
<div align="center">
    <img src="https://img.shields.io/badge/styled-components-DB7093?style=flat&logo=styled-components&logoColor=white"/>
    <img src="https://img.shields.io/badge/React-764ABC?style=flat&logo=React&logoColor=white"/>
    <img src="https://img.shields.io/badge/JsonServer-000000?style=flat&logo=JSON&logoColor=white"/>
    <img src="https://img.shields.io/badge/Vercel-000000?style=flat&logo=Vercel&logoColor=white"/>
</div>

<br>
<br>
<br>

### 구현사항

1. 이슈 CRUD
2. 각 이슈의 고유번호, 제목, 내용, 마감일, 상태, 담당자 구성
3. 각 이슈 클릭 시 상세정보 창 모달 팝업
4. 상세정보 창 내 변경사항 저장 버튼을 통해 수정 가능
5. 이슈 정렬 : 고유번호 오름차순 & 변경 순서로 우선 정렬
6. Drag & Drop을 이용한 이슈 순서 / 이슈 상태 변경 가능

### 추가 조건

- 로딩 중 LoadingSpinner를 통한 액션 방지
- 중복 액션 방지를 위한 딜레이 적용
- 새로고침 여부와 무관한 데이터 관리
- redux thunk - reject를 이용한 에러상황을 고려한 store 세팅

<br>

## 디렉토리 구조

```bash
src
   ├── index.js # entrypoint
   ├── App.jsx
   ├── components
   │   └── kanbanBox
   │   │   ├── Card.jsx
   │   │   └── IssueBox.jsx
   │   └── loadingSpinner
   │   │   └── LoadingSpinner.jsx
   │   └── modal
   │       ├── AddModal.jsx
   │       ├── AutoComplite.jsx
   │       └── DetailModal.jsx
   ├── redux
   │   ├── dndSlice.jsx
   │   ├── issueSlice.jsx
   │   └── store.jsx
   ├── page
   │   └── Home.jsx
   ├── hooks
   │   └── uesForm.jsx
   ├── util
   │   └── Modal.jsx
   ├── images
   └── api
       └── api.js
```
