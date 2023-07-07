import { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, Link } from 'react-router-dom';

const Menu = forwardRef((props, ref) => {
	const active = { color: 'aqua' };
	const [Open, setOpen] = useState(false);

	useEffect(() => {
		// 모든 페이지에 있어야 하는 요소이므로 unmount할 때 제거할 필요가 없다.
		window.addEventListener('resize', () => {
			if (window.innerWidth >= 1200) setOpen(false);
		});
	}, []);

	useImperativeHandle(ref, () => {
		return { toggle: () => setOpen(!Open) };
	});

	return (
		<AnimatePresence>
			{Open && (
				<motion.nav
					id='mobile-panel'
					initial={{ opacity: 0, x: -280 }}
					animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
					exit={{ opacity: 0, x: -280, transition: { duration: 0.5 } }}
					onClick={() => setOpen(false)}
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
});

export default Menu;
