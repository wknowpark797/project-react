import { Link, NavLink } from 'react-router-dom';

function Header() {
	return (
		<header>
			<h1>
				<Link to='/'>LOGO</Link>
			</h1>

			<ul id='gnb'>
				<li>
					<NavLink to='/department'>department</NavLink>
				</li>
				<li>
					<NavLink to='/community'>community</NavLink>
				</li>
				<li>
					<NavLink to='/gallery'>gallery</NavLink>
				</li>
				<li>
					<NavLink to='/youtube'>youtube</NavLink>
				</li>
				<li>
					<NavLink to='/contact'>contact</NavLink>
				</li>
				<li>
					<NavLink to='/member'>member</NavLink>
				</li>
			</ul>
		</header>
	);
}

export default Header;
