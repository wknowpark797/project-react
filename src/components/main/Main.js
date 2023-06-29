import Header from '../common/Header';
import Banner from './Banner';
import News from './News';
import Pics from './Pics';
import Vids from './Vids';
import Visual from './Visual';
import Btns from './Btns';
import { useState } from 'react';

function Main() {
	/*
		부모요소에 state와 state변경 함수를 만들고 값을 전달해야 하는 자식 컴포넌트에는 state변경 함수를, 값을 받아야 하는 자식 컴포넌트에는 state값을 prop으로 전달
	*/
	const [Scrolled, setScrolled] = useState(0); // 현재 스크롤 위치
	const [Pos, setPos] = useState([]); // 각 section의 offsetTop값

	return (
		<main>
			{/* 메인 전용 라우터 Header */}
			<Header type={'main'}></Header>
			<Visual />
			<News />

			{/* Pics 컴포넌트 활성화 순간부터 Scrolled값을 Pics의 제목 스타일과 연동 */}
			<Pics Scrolled={Scrolled} Pos={Pos[2]} />
			<Vids />
			<Banner />

			<Btns setScrolled={setScrolled} setPos={setPos} />
		</main>
	);
}

export default Main;
