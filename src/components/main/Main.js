import Header from '../common/Header';
import Banner from './Banner';
import News from './News';
import Pics from './Pics';
import Vids from './Vids';
import Visual from './Visual';

import { useEffect, useRef } from 'react';

function Main() {
	console.log('main called');
	const main = useRef(null);

	// offset값을 초기화 시키지 않기 위한 처리
	let pos = useRef([]);

	// myScroll 공통 클래스가 있는 section을 찾아 세로 위치값을 참조객체에 배열로 저장하는 함수
	const getPos = () => {
		pos.current = [];
		const sections = main.current.querySelectorAll('.myScroll');
		for (const section of sections) {
			pos.current.push(section.offsetTop);
		}
		console.log(pos.current);
	};

	useEffect(() => {
		getPos();
		// window 객체 이벤트 사용의 문제점
		// window는 리액트가 제어할 수 없는 최상위 요소
		window.addEventListener('resize', getPos);

		return () => {
			// 이벤트 소멸
			// window 객체에 이벤트를 연결하면 다른 서브 페이지 컴포넌트에서도 동일하게 함수가 호출되어 에러가 발생
			// 해당 컴포넌트가 unmount될 때 무조건 window 전역객체에 연결되어 있는 이벤트 핸들러 함수를 제거해야 한다.
			// 핸들러 함수를 제거하기 위해서 해당 함수가 외부 함수로 선언되어 있어야 한다.
			window.removeEventListener('resize', getPos);
		};
	}, []);

	return (
		<main ref={main}>
			{/* 메인 전용 라우터 Header */}
			<Header type={'main'}></Header>
			<Visual />
			<News />
			<Pics />
			<Vids />
			<Banner />
		</main>
	);
}

export default Main;
