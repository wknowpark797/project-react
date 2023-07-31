import Layout from '../common/Layout';
// import { useSelector } from 'react-redux';
import { useDepartmentQuery } from '../../hooks/useDepartmentQuery';

function Department() {
	// const Members = useSelector((store) => store.department.data);
	const { data: Members, isSuccess } = useDepartmentQuery();

	return (
		// prop으로 자식요소에 줄바꿈 텍스트를 전달하고 싶을 때 구분자가 될 문자값을 포함하여 전달
		<Layout name={'Department'} txt={'Hello-World'} bg={'Department.jpg'}>
			{isSuccess &&
				Members.map((member, idx) => {
					return (
						<article key={idx}>
							<div className='pic'>
								<img src={`${process.env.PUBLIC_URL}/img/${member.pic}`} alt={member.name} />
								<img src={`${process.env.PUBLIC_URL}/img/${member.pic}`} alt={member.name} />
							</div>
							<h2>{member.name}</h2>
							<p>{member.position}</p>
						</article>
					);
				})}
		</Layout>
	);
}

export default Department;
