import { useState, useEffect, useRef } from 'react';
import Anime from '../../asset/anime';

function Btns() {
	const btnRef = useRef(null);
	const pos = useRef([]); // offset값이 초기화되지 않도록 처리
	const [Num, setNum] = useState(0);

	// myScroll 공통 클래스가 있는 section을 찾아 offset 위치값을 참조객체에 배열로 저장하는 함수
	const getPos = () => {
		pos.current = [];
		const sections = btnRef.current.parentElement.querySelectorAll('.myScroll');

		for (const section of sections) {
			pos.current.push(section.offsetTop);
		}
		console.log(pos.current);

		setNum(pos.current.length);
	};

	const activation = () => {
		const base = -window.innerHeight / 2;
		const scroll = window.scrollY;
		const btns = btnRef.current.children;
		const boxs = btnRef.current.parentElement.querySelectorAll('.myScroll');

		pos.current.forEach((pos, idx) => {
			if (scroll >= pos + base) {
				for (const btn of btns) btn.classList.remove('on');
				btns[idx].classList.add('on');

				for (const box of boxs) box.classList.remove('on');
				boxs[idx].classList.add('on');
			}
		});
	};

	useEffect(() => {
		getPos();
		/*
			[ window 객체 이벤트 사용의 문제점 ]
			window 객체는 리액트가 제어할 수 없는 최상위 요소
		*/
		window.addEventListener('resize', getPos);
		window.addEventListener('scroll', activation);

		// 클리너 함수
		return () => {
			/*
				[ window 객체 이벤트 소멸 ]
				- window 객체에 이벤트 연결시 다른 서브 페이지 컴포넌트에서도 동일하게 함수가 호출되어 에러 발생
				- 해당 컴포넌트가 unmount될 때 무조건 window 전역객체에 연결되어 있는 이벤트 핸들러 함수를 제거해야 한다.

				핸들러 함수를 제거하기 위해서는 해당 함수가 외부 함수로 선언되어 있어야 한다.
			*/
			window.removeEventListener('resize', getPos);
			window.removeEventListener('scroll', activation);
		};
	}, []);

	return (
		<ul ref={btnRef} className='btnNavi'>
			{/* Main의 section 개수만큼 버튼을 동적으로 생성 */}
			{Array(Num)
				.fill()
				.map((_, idx) => {
					let defaultClass = '';
					if (idx === 0) defaultClass = 'on';

					return (
						<li
							key={idx}
							className={defaultClass}
							onClick={() => {
								new Anime(window, {
									prop: 'scroll',
									value: pos.current[idx],
									duration: 500,
								});
							}}
						></li>
					);
				})}
		</ul>
	);
}

export default Btns;
