import { useSelector } from 'react-redux';

function Footer() {
	const department = useSelector((store) => store.department.data);

	return (
		<footer>
			<h1>LOGO</h1>
			<p>2023 DCODELAB &copy; ALL RIGHTS RESERVED.</p>
			<p>{`This Company was founded by ${department[0]?.name} in 2023`}</p>
		</footer>
	);
}

export default Footer;
