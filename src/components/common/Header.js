import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { toggle } from '../../redux/menuSlice';

function Header({ type }) {
	const activeClass = 'on';
	/*
		const activeStyle = {
			color: 'lightblue',
		};
	*/

	const dispatch = useDispatch();

	return (
		<>
			<header className={type}>
				<h1>
					<Link to='/'>LOGO</Link>
				</h1>

				<ul id='gnb'>
					<li>
						<NavLink to='/department' activeClassName={activeClass}>
							department
						</NavLink>
					</li>
					<li>
						<NavLink to='/community' activeClassName={activeClass}>
							community
						</NavLink>
					</li>
					<li>
						<NavLink to='/gallery' activeClassName={activeClass}>
							gallery
						</NavLink>
					</li>
					<li>
						<NavLink to='/youtube' activeClassName={activeClass}>
							youtube
						</NavLink>
					</li>
					<li>
						<NavLink to='/contact' activeClassName={activeClass}>
							contact
						</NavLink>
					</li>
					<li>
						<NavLink to='/member' activeClassName={activeClass}>
							member
						</NavLink>
					</li>
				</ul>

				<FontAwesomeIcon
					icon={faBars}
					onClick={() => {
						dispatch(toggle());
					}}
				/>
			</header>
		</>
	);
}

export default memo(Header);
