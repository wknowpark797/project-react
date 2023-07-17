import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import youtubeReducer from './redux/youtubeSlice';
import departmentReducer from './redux/departmentSlice';
import flickrReducer from './redux/flickrSlice';

const store = configureStore({
	reducer: {
		youtube: youtubeReducer,
		department: departmentReducer,
		flickr: flickrReducer,
	},
});

ReactDOM.render(
	<HashRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</HashRouter>,
	document.getElementById('root')
);

/*
	Redux Saga vs Redux Toolkit
	
	[ redux-saga ]
	- 비동기 데이터의 호출 및 reducer, 상태변경 관리 함수를 saga에서 generator함수를 통해 변경요청
	- 컴포넌트 외부에서 독립적으로 비동기데이터를 전역관리하기 위한 라이브러리

	[ redux-thunk ]
	- action객체 안쪽에 비동기 데이터 호출 함수 및 상태변화 관리 함수를 같이 등록
	-> 개선 redux-toolkit

	[ redux-toolkit ]
	- redux-thunk 기반의 통합 라이브러리
	- 기존 action객체의 생성을 slice라는 파일 형태로 컴포넌트 외부에서 아주 간단하게 설정 가능
	- (npm install @reduxjs/toolkit react-redux)
*/
