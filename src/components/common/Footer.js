import { useSelector } from 'react-redux';

function Footer() {
	const Members = useSelector((store) => store.membersReducer.members);

	return (
		<footer>
			<h1>LOGO</h1>
			<p>2023 DCODELAB &copy; ALL RIGHTS RESERVED.</p>
			<p>{`This Company was founded by ${Members[0]?.name} in 1995`}</p>
		</footer>
	);
}

export default Footer;
