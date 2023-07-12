import { useSelector } from 'react-redux';

function Footer() {
	const Members = useSelector((store) => store.memberReducer.members);

	return (
		<footer>
			<h1>LOGO</h1>
			<p>2023 DCODELAB &copy; ALL RIGHTS RESERVED.</p>
			<p>{`This Institute was established by ${Members[0]?.name} in 1995`}</p>
		</footer>
	);
}

export default Footer;
