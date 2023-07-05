import Layout from '../common/Layout';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Department() {
	const [Members, setMembers] = useState([]);
	console.log(Members);

	useEffect(() => {
		axios.get(`${process.env.PUBLIC_URL}/DB/members.json`).then((data) => {
			setMembers(data.data.members);
		});
	}, []);

	return (
		// prop으로 자식요소에 줄바꿈될 텍스트를 전달하고 싶을 때 줄바꿈될 부분에 구분자가 될 문자값을 포함하여 전달
		<Layout name={'Department'} txt={'Hello-World'}>
			{Members.map((member, idx) => {
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
