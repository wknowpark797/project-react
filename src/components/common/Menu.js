/*
	[ Redux Toolkit - Client Side State 전역 관리하기 ]

	{ open: false } // false - 메뉴제거, true - 메뉴오픈

	1. menuSlice.js를 생성해서 위의 정보값을 초기 전역 state로 등록
	2. reducer에는 해당 전역 state값을 변경해주는 함수를 등록 (close, toggle)
	3. 해당 함수를 원하는 컴포넌트에서 자유롭게 호출해서 전역 state를 변경할 수 있다.
*/

// import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { close } from '../../redux/menuSlice'; // menuSlice로부터 전역 state값을 변경해주는 close 함수를 import
import { useGlobalData } from '../../hooks/useGlobalContext';

function Menu() {
	const active = { color: 'aqua' };
	// const dispatch = useDispatch();
	// const menu = useSelector((store) => store.menu.open);
	const { MenuOpen, setMenuOpen } = useGlobalData();

	/*
	useEffect(() => {
		window.addEventListener('resize', () => {
			if (window.innerWidth >= 1200) dispatch(close());
		});
	}, [dispatch]);
	*/

	return (
		<AnimatePresence>
			{MenuOpen && (
				<motion.nav
					id='mobile-panel'
					initial={{ opacity: 0, x: -280 }}
					animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
					exit={{ opacity: 0, x: -280, transition: { duration: 0.5 } }}
					// onClick={() => dispatch(close())} // 닫기버튼 클릭시 전역 state를 변경하는 close 함수를 호출해서 그 결과값인 action객체를 dispatch로 전달
					onClick={() => {
						setMenuOpen(false);
					}}
				>
					<h1>
						<Link to='/'>LOGO</Link>
					</h1>

					<ul id='gnb-mobile'>
						<li>
							<NavLink to='/department' activeStyle={active}>
								department
							</NavLink>
						</li>
						<li>
							<NavLink to='/community' activeStyle={active}>
								community
							</NavLink>
						</li>
						<li>
							<NavLink to='/gallery' activeStyle={active}>
								gallery
							</NavLink>
						</li>
						<li>
							<NavLink to='/youtube' activeStyle={active}>
								youtube
							</NavLink>
						</li>
						<li>
							<NavLink to='/contact' activeStyle={active}>
								contact
							</NavLink>
						</li>
						<li>
							<NavLink to='/member' activeStyle={active}>
								member
							</NavLink>
						</li>
					</ul>
				</motion.nav>
			)}
		</AnimatePresence>
	);
}

export default Menu;
