/* 전역 state의 데이터를 action type의 종류에 따라 변경한 뒤 반환하는 함수 */

import { combineReducers } from 'redux';
import * as types from './actionType';

// youtube
const youtubeReducer = (state = { youtube: [] }, action) => {
	switch (action.type) {
		// 컴포넌트로부터 넘겨받는 action 객체
		// 해당 객체를 넘겨받으면 saga에서 해당 타입에 대한 비동기 데이터를 처리하여 새로운 객체 반환
		case types.YOUTUBE.start:
			return state;

		// saga로부터 새롭게 넘겨받은 action객체로 데이터 처리 (데이터 fetching 성공시)
		case types.YOUTUBE.success:
			return { ...state, youtube: action.payload };

		// saga로부터 새롭게 넘겨받은 action객체로 데이터 처리 (데이터 fetching 실패시)
		case types.YOUTUBE.fail:
			return { ...state, youtube: action.payload };

		default:
			return state;
	}
};

// members
const membersReducer = (state = { members: [] }, action) => {
	switch (action.type) {
		case types.MEMBERS.start:
			return state;
		case types.MEMBERS.success:
			return { ...state, members: action.payload };
		case types.MEMBERS.fail:
			return { ...state, members: action.payload };
		default:
			return state;
	}
};

// flickr
const flickrReducer = (state = { flickr: [] }, action) => {
	switch (action.type) {
		case types.FLICKR.start:
			return state;
		case types.FLICKR.success:
			return { ...state, flickr: action.payload };
		case types.FLICKR.fail:
			return { ...state, flickr: action.payload };
		default:
			return state;
	}
};

const reducers = combineReducers({ youtubeReducer, membersReducer, flickrReducer });
export default reducers;
