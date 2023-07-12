/* 
	store의 데이터를 변경해주는 변형자 함수
	- 초기 데이터값을 state로 지정하고 추후 action객체가 넘어오면 action의 타입에 따라 해당 데이터를 변경해주는 변형자 함수 생성
	- 비동기 형식으로 받을 데이터를 빈배열로 초기화
*/

import { combineReducers } from 'redux'; // 여러개의 객체 데이터를 하나의 객체로 합쳐준다.

/* Members */
const memberReducer = (state = { members: [] }, action) => {
	switch (action.type) {
		case 'SET_MEMBERS':
			return { ...state, members: action.payload };
		default:
			return state;
	}
};

/* Youtube */
const youtubeReducer = (state = { youtube: [] }, action) => {
	switch (action.type) {
		case 'SET_YOUTUBE':
			return { ...state, youtube: action.payload };
		default:
			return state;
	}
};

// 해당 변형자 함수가 반환하는 객체값을 하나의 객체로 합쳐서 외부로 export
const reducers = combineReducers({ memberReducer, youtubeReducer });
export default reducers;
