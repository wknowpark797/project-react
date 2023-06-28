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
		window.addEventListener('resize', getPos);
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
