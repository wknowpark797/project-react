import Header from '../common/Header';
import Banner from './Banner';
import News from './News';
import Pics from './Pics';
import Vids from './Vids';
import Visual from './Visual';
import Btns from './Btns';
import { useState } from 'react';

function Main({ menu }) {
	/*
		부모요소에 state와 state변경 함수를 만들기
		- 값을 전달해야 하는 자식 컴포넌트에는 state변경 함수를 prop으로 전달
		- 값을 받아야 하는 자식 컴포넌트에는 state값을 prop으로 전달
	*/
	const [Scrolled, setScrolled] = useState(0); // 현재 스크롤 위치
	const [Pos, setPos] = useState([]); // 각 section의 offsetTop값

	return (
		<main>
			{/* 메인 전용 라우터 Header */}
			<Header type={'main'} menu={menu} />

			<Visual />
			<News />
			<Pics Scrolled={Scrolled} Pos={Pos[2]} />
			<Vids />
			<Banner />

			<Btns setScrolled={setScrolled} setPos={setPos} />
		</main>
	);
}

export default Main;

/*
	[ Prop Drilling ]
	- 특정 값을 자식 컴포넌트에게 전달하기 위해서 불필요하게 많은 중간 컴포넌트들이 값을 전달하는 목적으로 쓰이는 경우
	
	[ Redux ]
	prop drilling을 방지하기 위해서 복잡하게 컴포넌트를 통해 전달할 값을 prop이 아닌 컴포넌트 외부에 데이터 전용 객체를 만들어서 어떤 위치의 컴포넌트에서도 편하게 값을 가져오거나 수정할 수 있도록 만드는 전역 데이터 체계
*/
