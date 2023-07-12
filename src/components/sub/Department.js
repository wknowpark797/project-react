import Layout from '../common/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { setMembers } from '../../redux/action';

function Department() {
	const Members = useSelector((store) => store.memberReducer.members);
	const dispatch = useDispatch(); // 활성화 시킨 후 사용이 가능

	return (
		// props로 자식요소에 줄바꿈 텍스트를 전달하고 싶을 때 구분자가 될 문자값을 포함하여 전달
		<Layout name={'Department'} txt={'Hello-World'}>
			<button
				onClick={() => {
					const newMembers = [...Members]; // 버튼 클릭시 기존 state값을 Deep Copy
					newMembers[0].name = 'Emma'; // Deep Copy된 참조형 자료 state정보값을 변경
					const newAction = setMembers(newMembers); // action 생성함수의 인수로 넣어 새로운 action객체 생성
					dispatch(newAction); // action객체를 dispatch를 통해 reducer에 전달
				}}
			>
				멤버 데이터 변경
			</button>

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
