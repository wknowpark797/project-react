import Layout from '../common/Layout';
import { useState, useEffect, useRef } from 'react';

function Community() {
	const input = useRef(null);
	const textarea = useRef(null);
	const [Posts, setPosts] = useState([]);

	const resetForm = () => {
		input.current.value = '';
		textarea.current.value = '';
	};

	const createPost = () => {
		// 유효성 검사
		if (!input.current.value.trim() || !textarea.current.value.trim()) {
			resetForm();
			return alert('제목과 본문을 모두 입력하세요.');
		}
		setPosts([{ title: input.current.value, content: textarea.current.value }, ...Posts]);
		resetForm();
	};

	const deletePost = (index) => {
		if (!window.confirm('해당 게시물을 삭제하시겠습니까?')) return;
		// filter 자체가 불변성을 유지하기 때문에 복사과정이 필요없다.
		setPosts(Posts.filter((_, idx) => idx !== index));
	};

	useEffect(() => {
		console.log(Posts);
	}, [Posts]);

	return (
		<Layout name={'Community'}>
			<div className='input-box'>
				{/* form 태그와 name 태그 사용X */}
				<input type='text' placeholder='제목을 입력하세요.' ref={input} />
				<br />
				<textarea cols='30' rows='3' placeholder='본문을 입력하세요.' ref={textarea}></textarea>
				<br />

				<nav className='btnSet'>
					<button onClick={resetForm}>cancel</button>
					<button onClick={createPost}>write</button>
				</nav>
			</div>

			<div className='show-box'>
				{Posts.map((post, idx) => {
					return (
						<article key={idx}>
							<div className='txt'>
								<h2>{post.title}</h2>
								<p>{post.content}</p>
							</div>

							<nav className='btnSet'>
								<button>EDIT</button>
								<button onClick={() => deletePost(idx)}>DELETE</button>
							</nav>
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Community;

/*
	[ CRUD ]
	- Create: 데이터 저장 (게시글 저장)
	- Read: 데이터 호출 (게시글 보기)
	- Update: 데이터 수정 (게시글 수정)
	- Delete: 데이터 삭제 (게시글 삭제)

	[ Restful API ]

	localStorage: 모든 브라우저마다 가지고 있는 경량의 데이터 베이스 (문자값만 저장 가능)
*/
