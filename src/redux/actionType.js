// 각 데이터 카테고리별로 사용될 action type명을 변수처럼 모아놓은 객체

export const YOUTUBE = {
	start: 'YOUTUBE_START',
	success: 'YOUTUBE_SUCCESS',
	fail: 'YOUTUBE_FAIL',
};

export const MEMBERS = {
	start: 'MEMBERS_START',
	success: 'MEMBERS_SUCCESS',
	fail: 'MEMBERS_FAIL',
};

/*
  [ Redux Saga 데이터 흐름 순서 ]
  1. actionType.js
    - 데이터 요청, 성공, 실패에 대한 action 타입을 세분화하여 객체형태로 export
  2. reducer.js
    - 세가지 action타입 요청에 대한 데이터 변경처리 함수 export
  3. api.js
    - axios로 비동기 데이터 호출 함수를 순수함수 형태로 만들어서 export
  4. saga.js
    - 처음에 reducer가 전달받는 start action 요청을 감지해서 api.js로부터 데이터 fetching 받고 새로운 action객체로 반환하는 함수
  5. store.js
    - reducer에 saga 미들웨어 연결 후 연결된 데이터값으로 store 전역객체에 저장 후 export
  6. index.js
    - store 전역객체를 App 루트 컴포넌트에 전달
  7. App.js
    - 컴포넌트가 mount 되자마자 Youtube_START라는 action 객체를 dispatch로 전달 
    - (이후 reducer -> saga -> store 흐름으로 전역 state 객체가 생성)
  8. 원하는 컴포넌트에서 자유롭게 useSelector로 해당 데이터를 가져온다.
*/
