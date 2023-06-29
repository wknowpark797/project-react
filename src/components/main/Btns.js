import { useState, useEffect, useRef } from 'react';
import Anime from '../../asset/anime';

function Btns({ setScrolled, setPos }) {
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
		setPos(pos.current);
	};

	const activation = () => {
		const base = -window.innerHeight / 2;
		const scroll = window.scrollY;
		const btns = btnRef.current.children;
		const boxs = btnRef.current.parentElement.querySelectorAll('.myScroll');
		setScrolled(scroll);

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
		// 리액트는 SPA이므로 페이지 변경시 스크롤값이 초기화 되지 않는다.
		// -> 컴포넌트를 mount할 때마다 매번 스크롤값을 초기화 해야 한다.
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

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
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		};
	}, []);
	/*
		[ ESLint 권고문구 ]
		eslint가 의존성 배열에 activation, getPos 함수의 등록 권고문구를 띄우는 이유

		- useEffect 내부에서 activation, getPos 외부함수를 사용하고 있으므로, 리액트 입장에서는 변경될수도 있는 점을 대비하여 의존성배열에 등록할 것을 권고

		-> activation, getPos 함수를 의존성 배열에 등록할 경우
				- 해당 컴포넌트가 업데이트 할때마다 해당 함수에서 변경되는 점이 없더라도 계속 호출하면서 무한루프에 빠진다.
					-> 함수의 호출이 재렌더링을 일으키면서 함수를 다시 호출하게 되고 재귀함수처럼 작동
				- 추후 useCallback, useMemo를 이용해서 컴포넌트 내부에 있는 특정 함수 혹은 특정 리턴값을 강제로 메모리에 저장해서 다음의 렌더링사이클에서는 같은 함수와 같은 리턴값을 매번 연산하지 않도록 처리 (Memoization)
					-> 메모리 점유율을 늘려서 성능을 올리는 방식 (등가교환)
					-> 메모리를 강제로 많이 점유하면 memoization 처리된 값들은 자바스크립트 엔진 내부적으로 garbage-collection에서 제외된다. (성능면에서 악영향을 미친다.) 
	*/

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
