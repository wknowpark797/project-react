import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';

ReactDOM.render(
	<HashRouter>
		<App />
	</HashRouter>,
	document.getElementById('root')
);

/*
	[ Redux ]
	npm install redux
	npm install react-redux

	[ redux 기본 개념 ]
	store: 어떤 컴포넌트에서든 자유롭게 데이터를 공유할 수 있도록 컴포넌트 외부에 있는 독립적인 전역 데이터 공간
	reducer: store의 데이터를 변경하는 변형자 함수 (dispatch로 전달받는 action객체로만 store 데이터 변경가능)
	action: 컴포넌트에서 reducer에 데이터변경 요청을 할 때 쓰이는 특별한 형태의 객체 
		- {type: '타입', payload: '데이터'}	

	[ react-redux ]
	useDispatch: 컴포넌트에서 reducer에 action객체를 전달해주는 함수
	useSelector: 컴포넌트에서 전역 store의 데이터를 가져오는 함수

	redux와 관련된 모든 함수들은 순수함수형태로 구성이 되어야 한다. (pure function)
		- 순수함수: DOM이나 react의 외부 요인 없이 순수 자바스크립트로만 동작되는 함수
		- Side Effect(부수효과)를 발생시키지 않는 함수 (DOM에 직접적으로 변형을 가하지 않는 함수)
*/
