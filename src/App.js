import { Route, Switch } from 'react-router-dom';
import { useEffect, useRef } from 'react';

import Footer from './components/common/Footer';
import Header from './components/common/Header';
import Main from './components/main/Main';
import Menu from './components/common/Menu';

import Community from './components/sub/Community';
import Contact from './components/sub/Contact';
import Department from './components/sub/Department';
import Gallery from './components/sub/Gallery';
import Member from './components/sub/Member';
import Youtube from './components/sub/Youtube';

// style
import './scss/style.scss';

import { fetchYoutube } from './redux/youtubeSlice';
import { fetchDepartment } from './redux/departmentSlice';
import { fetchFlickr } from './redux/flickrSlice';
import { useDispatch } from 'react-redux';

/*
	[ redux-toolkit 작업 흐름 ]
	1. redux 폴더에 작업하려는 data의 slice 파일 생성 (data fetching 후 action객체 생성함수, action객체를 받아서 전역 데이터 수정함수)
	2. index.js에서 slice값으로 연동된 데이터를 store에 저장하고 App.js에 전달
	3. App.js에서 slice 파일로부터 action객체 생성 함수를 import 후 호출하여 action객체를 만들고 dispatch로 전달
	4. 원하는 컴포넌트에서 useSelector로 데이터 가져오기
*/
function App() {
	const menu = useRef(null);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchYoutube());
		dispatch(fetchDepartment());
		dispatch(fetchFlickr({ type: 'user', user: '198471371@N05' }));
	}, [dispatch]);

	return (
		<>
			{/* Switch는 내부에 중복되는 라우트 경로가 있을 때 먼저 작성된 라우터를 채택하고 나머지는 무시 */}
			<Switch>
				<Route exact path='/' render={() => <Main menu={menu} />} />

				{/* 컴포넌트에 props 전달이 있을 경우의 축약형 */}
				<Route path='/' render={() => <Header type={'sub'} menu={menu} />} />
			</Switch>
			{/* 기본 축약형 */}
			<Route path='/department' component={Department} />
			{/* <Route path='/department'>
				<Department />
			</Route> */}
			<Route path='/community' component={Community} />
			{/* <Route path='/gallery' component={Gallery} /> */}
			<Route path='/youtube' component={Youtube} />
			<Route path='/contact' component={Contact} />
			<Route path='/member' component={Member} />
			<Footer />

			{/* Menu 컴포넌트를 App.js에서 호출한 뒤 toggle 객체를 각각 메인, 서브 헤더로 전달해서 toogle 메뉴 기능이
			동작하도록 처리 */}
			<Menu ref={menu} />
		</>
	);
}

export default App;
