import { Route, Switch } from 'react-router-dom';
// import { useEffect } from 'react';

import Footer from './components/common/Footer';
import Header from './components/common/Header';
import Menu from './components/common/Menu';
import Main from './components/main/Main';
import Community from './components/sub/Community';
import Contact from './components/sub/Contact';
import Department from './components/sub/Department';
import Gallery from './components/sub/Gallery';
import Member from './components/sub/Member';
import Youtube from './components/sub/Youtube';

import './scss/style.scss';

// import { fetchDepartment } from './redux/departmentSlice';
// import { fetchYoutube } from './redux/youtubeSlice';
// import { fetchFlickr } from './redux/flickrSlice';
// import { useDispatch } from 'react-redux';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

/*
	[ redux-toolkit 작업 흐름 ]

	1. redux 폴더에 작업하려는 data의 slice 파일 생성 
		- data fetching 후 action객체를 생성하는 함수
		- action객체를 받아서 전역 데이터를 수정하는 함수
	2. index.js에서 slice값으로 연동된 데이터를 store에 저장하고 App.js에 전달
	3. App.js에서 slice 파일로부터 action객체 생성 함수를 import 후 호출하여 action객체를 만들고 dispatch로 전달
	4. 원하는 컴포넌트에서 useSelector로 데이터 가져오기
*/

function App() {
	console.log('Render...');
	const [Count, setCount] = useState(0);
	const [Count2, setCount2] = useState(0);

	const returnPromise = () => {
		return new Promise((res) => setTimeout(res, 500));
	};

	const handleClick = () => {
		// Automatic Batching 2번씩 렌더링
		returnPromise().then(() => {
			setCount(Count + 1);
			setCount2(Count2 + 2);
		});

		// Automatic Batching 한번에 렌더링 (정상 작동)
		// setCount(Count + 1);
		// setCount2(Count2 + 2);
	};

	const queryClient = new QueryClient();
	// const dispatch = useDispatch();

	/*
	useEffect(() => {
		// dispatch(fetchDepartment());
		// dispatch(fetchYoutube());
		// dispatch(fetchFlickr({ type: 'user', user: '198471371@N05' }));
	}, [dispatch]);
	*/

	return (
		<QueryClientProvider client={queryClient}>
			<div style={{ position: 'fixed', zIndex: 10 }}>
				<button onClick={handleClick}>Button</button>
				<h1 style={{ color: '#fff' }}>
					{Count} - {Count2}
				</h1>
			</div>

			{/* Switch는 내부에 중복되는 라우트 경로가 있을 때 먼저 작성된 라우터를 채택하고 나머지는 무시 */}
			<Switch>
				<Route exact path='/' render={() => <Main />} />

				{/* 컴포넌트에 props 전달이 있을 경우의 축약형 */}
				<Route path='/' render={() => <Header type={'sub'} />} />
			</Switch>
			{/* 기본 축약형 */}
			<Route path='/department' component={Department} />
			{/* <Route path='/department'>
				<Department />
			</Route> */}
			<Route path='/community' component={Community} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/contact' component={Contact} />
			<Route path='/member' component={Member} />
			<Footer />

			{/* Menu 컴포넌트를 App.js에서 호출한 뒤 toggle 객체를 각각 메인, 서브 헤더로 전달해서 toogle 메뉴 기능이
			동작하도록 처리 */}
			<Menu />

			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

export default App;

/*
	[ Automatic Batching ]
	- 여러개의 state값이 하나의 핸들러 함수 안쪽에서 동시에 변경될 때 그룹으로 묶어 한번만 렌더링 처리
	- 17버전에서도 동작되는 기능이지만 promise를 반환하는 함수 안쪽에서 여러개의 state값이 변경될 경우에는 동작되지 않는다.
	-> 18버전에서 문제해결
*/
