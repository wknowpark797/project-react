/*
	reducer에 action 요청이 처음 들어왔을 때 중간에서 가로채 대신 중간작업을 수행한 뒤
	다시 새롭게 반환된 action 객체를 reducer에 전달
	-> 미들웨어: 중간 특정시점에 간섭해서 부가적인 기능을 수행
*/

import { takeLatest, put, call, fork, all } from 'redux-saga/effects';
import { fetchYoutube, fetchMembers, fetchFlickr } from './api';
import * as types from './actionType';

/*
	callYoutube()
	- 컴포넌트로부터 reducer에 전달된 YOUTUBE_START action 요청을 대신 전달받아 데이터 fetching 함수를 호출해주는 함수

	returnYoutube()
	- 유튜브 데이터를 호출한 뒤 반환된 값으로 새롭게 action객체를 생성하고 reducer에 전달
*/

/* youtube saga */
function* callYoutube() {
	yield takeLatest(types.YOUTUBE.start, returnYoutube);
}
function* returnYoutube() {
	try {
		const response = yield call(fetchYoutube);
		yield put({ type: types.YOUTUBE.success, payload: response.data.items }); // 데이터 fetching 성공시
	} catch (err) {
		yield put({ type: types.YOUTUBE.fail, payload: err }); // 데이터 fetching 실패시
	}
}

/* members saga */
function* callMembers() {
	yield takeLatest(types.MEMBERS.start, returnMembers);
}
function* returnMembers() {
	try {
		const response = yield call(fetchMembers);
		yield put({ type: types.MEMBERS.success, payload: response.data.members });
	} catch (err) {
		yield put({ type: types.MEMBERS.fail, payload: err });
	}
}

/* flickrs saga */
function* callFlickr() {
	yield takeLatest(types.FLICKR.start, returnFlickr);
}
function* returnFlickr(action) {
	try {
		// 컴포넌트에서 action객체 전달시 type외의 프로퍼티값이 있다면 해당 값을 받아서 call 함수의 두번째 인수로, api함수의 인수로 전달 가능
		const response = yield call(fetchFlickr, action.opt);
		yield put({ type: types.FLICKR.success, payload: response.data.photos.photo });
	} catch (err) {
		yield put({ type: types.FLICKR.fail, payload: err });
	}
}

// 최종적으로 fork를 통해 call 호출 함수 제작
export default function* rootSaga() {
	yield all([fork(callYoutube), fork(callMembers), fork(callFlickr)]);
}

/*
  takeLatest (가장 마지막에 들어온 api 요청만 수행) - 가장 많이 사용
  takeEvery (들어오는 모든 api 요청을 수행)
  put (saga에서 새롭게 생성된 action객체를 reducer에 전달, saga에서 전용으로 쓰이는 dispatch)
  call (saga에서 api 관련 함수를 가져와서 호출할 때 쓰이는 함수, 두번째 인수값을 전달 가능)
  fork (saga 관련 함수를 실행하는 함수)
  all (fork 함수를 비동기적으로 동시에 여러개 호출할 때 필요한 함수)

  [ 작업 흐름 ]
  1. 컴포넌트로부터 reducer에 전달된 초기 action 요청을 takeLatest로 가져오는 함수 정의
  2. api.js로부터 fetching 함수를 가져와서 call로 호출하는 함수 정의
  3. 데이터 fetching에 성공유무에 따라 서로 다른 action객체를 반환
  4. 이렇게 만들어진 함수를 한번에 호출하는 함수를 제작
  5. 위의 모든 함수들을 saga단에서 단계에 맞게 동기화 호출을 할 수 있도록 Generator 함수로 제작
*/
