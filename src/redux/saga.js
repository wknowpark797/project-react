// reducer에 action 요청이 처음 들어왔을 때 중간에서 가로채서 대신 중간작업을 수행한 뒤
// 다시 새롭게 반환된 action 객체를 reducer에 다시 전달
// 미들웨어: 중간 특정시점에 간섭해서 부가적인 기능을 수행

/*
  takeLatest (가장 마지막에 들어온 api 요청만 수행)
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

import { takeLatest, put, call, fork, all } from 'redux-saga/effects';
import { fetchYoutube } from './api';
import * as types from './actionType';

// 컴포넌트로부터 reducer에 전달된 YOUTUBE_START action요청을 대신 전달받아 데이터 fetching 함수를 호출해주는 함수
function* callYoutube() {
	yield takeLatest(types.YOUTUBE.start, returnYoutube);
}

// 유튜브 데이터를 호출한 뒤 반환된 값으로 새롭게 action객체를 생성하는 함수
function* returnYoutube() {
	try {
		// 데이터 fetching 성공시
		const response = yield call(fetchYoutube);
		yield put({ type: types.YOUTUBE.success, payload: response.data.items }); // reducer에 전달
	} catch (err) {
		// 데이터 fetching 실패시
		yield put({ type: types.YOUTUBE.fail, payload: err });
	}
}

// 최종적으로 fork를 통해 callYoutube 호출 함수 제작
export default function* rootSaga() {
	yield all([fork(callYoutube)]);
}
