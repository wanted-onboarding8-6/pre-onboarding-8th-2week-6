# 이슈 트래킹 툴 - 원티드 프리온보딩 2주차 과제

## 배포주소 : https://pre-onboarding-8th-2week-6.vercel.app/

</br>

## json-server 배포 레포 :
<a href="https://github.com/LEE-YO-HAN/week2json">https://github.com/LEE-YO-HAN/week2json</a>

</br></br>
https://pre-onboarding-8th-2week-6.vercel.app/
## 6조

### Team

- 김태훈(팀장)
- 김민정
- 김종이
- 송지현
- 이상현
- 이요한
- 이조은
- 2023.01.03 - 01.06

<br><br>

## 목차

1. [Local Start](#local-start)
2. [구현사항](#구현사항)
3. [구현방법](#구현-방법)
4. [Local Start](#local-start)

</br></br>

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
3. 각 이슈 클릭 시 상세정보 창 모달을 통해 팝업
4. 상세정보 창 내 변경사항 저장 버튼을 통해 수정 가능
5. 이슈 정렬 : 고유번호 오름차순 & 변경 순서로 우선 정렬
6. Drag & Drop을 이용한 이슈 순서 / 이슈 상태 변경 가능

### 추가 조건

- 로딩 중 LoadingSpinner를 통한 액션 방지
- 중복 액션 방지를 위한 딜레이 적용
- 새로고침 여부와 무관한 데이터 관리
- redux thunk - reject를 이용한 에러상황을 고려한 store 세팅

</br></br></br>

### 구현 방법

1. 배포
- 백엔드의 부재로 필요한 APIserver는 json-server를 vercer을 통해 배포하고,
</br>
프론트 또한 vercel을 통해 배포 진행

</br>

2. 기능
- CRUD : redux를 통한 전역 상태관리를 통해 변경되는 데이터를 화면에 그려줌
</br></br>
- Drag & Drop : drag 이벤트 속성을 이용해 구현
</br>
dragStart - 현재 드래그를 시작한 이슈 카드의 정보를 저장 (redux)
</br>
dragEnter/dragLeave - 적합한 드래그 좌표에 들어왔는지 여부 확인
</br>
dragOver - 적합한 좌표(비교할 이슈 카드 등) 위에 있는 경우 해당 정보를 저장 (redux)
</br>
drop - 정렬할 정보 업데이트를 위한 데이트 확정
</br>
dragEnd - update처리(redux)
</br>
이슈의 정렬은 sort ID를 추가해 수정되며 정렬될 수 있도록 설정
</br></br>
- AutoComplite : 미리 받아온 데이터와 input 값을 비교하여
</br>
input 값을 포함하는 이름만 노출할 수 있도록 설정
</br></br>
- Loading : 데이터 중복 요청을 미연에 방지하고자 redux를 통한 로딩 여부 상태관리와, CSS를 이용한 Loading Spinner를 통해 데이터작업 등 로딩 상태일 경우의 UI></br>

### 코드 개선
- add/edit form : useForm custom hook을 만들어 요청에 필요한 데이터를 최소한의 코드로 작성하도록 지향하여,
</br>
중복되는 함수 등의 코드를 간소화시킴 (350줄 -> 280~290 약 20% 감소)
</br></br>
- home/kanban : home --> kanbanBox.map --> issueCard.map 과 같이
</br>
2중 map 구조를 통해 전반적인 코드 간소화를 노출시켜줌
</br></br>

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
