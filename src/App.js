import { Route, Switch } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setYoutube } from './redux/action';

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

function App() {
	const menu = useRef(null);
	const dispatch = useDispatch();

	const fetchYoutube = async () => {
		const key = 'AIzaSyA4f3SqOYivsLVITR7K6g5K0QrKhvUZ7hw';
		const list = 'PLuYjs7JL1VFCBJV6rASuppjv0wuF4iTR7';
		const num = 10;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;

		// async await로 변환 (useEffect 밖에서 함수생성 후 호출)
		const result = await axios.get(url);

		// setVideoList(result.data.items);
		dispatch(setYoutube(result.data.items));
	};

	useEffect(() => {
		fetchYoutube();
	}, []);

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
			<Route path='/gallery' component={Gallery} />
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
