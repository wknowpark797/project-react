import Layout from '../common/Layout';
import { useState, useEffect, useRef } from 'react';

function Community() {
	const input = useRef(null);
	const textarea = useRef(null);
	const editInput = useRef(null);
	const editTextarea = useRef(null);

	const [Posts, setPosts] = useState([]);
	const [Allowed, setAllowed] = useState(true);

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

	const enableUpdate = (index) => {
		// 수정모드 진입함수 호출 시 Allowed가 true일 때에만 로직이 실행되도록 처리
		if (!Allowed) return;
		// 로직이 실행되면 allowed값을 false로 바꿔서 이후부터는 다시 수정모드로 진입되는 것을 방지
		setAllowed(false);
		setPosts(
			Posts.map((post, idx) => {
				if (index === idx) post.enableUpdate = true;
				return post;
			})
		);
	};

	const disableUpdate = (index) => {
		setPosts(
			Posts.map((post, idx) => {
				if (index === idx) post.enableUpdate = false;
				return post;
			})
		);
		// 글 수정 취소버튼을 눌러서 disableUpdate 함수가 호출이 되어야 Allowed값을 다시 true로 바꿔 글 수정이 가능하도록 처리
		setAllowed(true);
	};

	const updatePost = (index) => {
		// 유효성 검사
		if (!editInput.current.value.trim() || !editTextarea.current.value.trim()) {
			return alert('수정할 제목과 본문을 모두 입력하세요.');
		}

		setPosts(
			Posts.map((post, idx) => {
				if (index === idx) {
					post.title = editInput.current.value;
					post.content = editTextarea.current.value;
					post.enableUpdate = false;
				}

				return post;
			})
		);
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
							{post.enableUpdate ? (
								// 수정 모드
								<>
									<div className='txt'>
										{/* onChange 이벤트로 제어하지 않는 input 요소의 value 값은 defaultValue 속성으로 지정 */}
										{/* value: 리액트의 상태값에 관리되는 Form 요소, defaultValue: 일반 DOM에 의해 관리되는 Form 요소 */}
										<input type='text' defaultValue={post.title} ref={editInput} />
										<br />
										<textarea cols='30' rows='3' defaultValue={post.content} ref={editTextarea}></textarea>
									</div>

									<nav className='btnSet'>
										<button onClick={() => disableUpdate(idx)}>CANCEL</button>
										<button onClick={() => updatePost(idx)}>UPDATE</button>
									</nav>
								</>
							) : (
								// 출력 모드
								<>
									<div className='txt'>
										<h2>{post.title}</h2>
										<p>{post.content}</p>
									</div>

									<nav className='btnSet'>
										<button onClick={() => enableUpdate(idx)}>EDIT</button>
										<button onClick={() => deletePost(idx)}>DELETE</button>
									</nav>
								</>
							)}
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
