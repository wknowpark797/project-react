import Layout from '../common/Layout';
import { useState, useEffect, useRef } from 'react';

function Community() {
	// 로컬 저장소의 데이터를 반환하는 함수 정의
	// 저장소에 값이 있으면 해당 값을 다시 JSON 형태로 변경하여 반환
	// 값이 없다면 빈 배열을 반환
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		return JSON.parse(data);
	};

	const input = useRef(null);
	const textarea = useRef(null);
	const editInput = useRef(null);
	const editTextarea = useRef(null);

	// getLocalData 함수의 리턴값으로 Posts state 초기화
	const [Posts, setPosts] = useState(getLocalData);
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

		// 최신 게시물부터 노출되도록 복사 순서 변경
		setPosts([{ title: input.current.value, content: textarea.current.value }, ...Posts]);
		resetForm();
	};

	const deletePost = (index) => {
		if (!window.confirm('해당 게시물을 삭제하시겠습니까?')) return;
		// filter 자체가 불변성을 유지하기 때문에 복사과정이 필요없다.
		setPosts(Posts.filter((_, idx) => idx !== index));
	};

	// 수정모드 진입 함수
	const enableUpdate = (index) => {
		// Allowed가 true일 때에만 로직이 실행되도록 처리
		if (!Allowed) return;

		// 로직 실행시 Allowed값을 false로 바꿔서 다른 게시물에서 수정모드로 진입하는 것을 방지
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
		// Allowed값을 다시 true로 바꿔 수정모드로 진입이 가능하도록 처리
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

		setAllowed(true);
	};

	useEffect(() => {
		// Posts state값이 변경될때마다 해당 데이터를 문자화하여 localStorage에 저장
		localStorage.setItem('post', JSON.stringify(Posts));
	}, [Posts]);

	useEffect(() => {
		// 기능 동작 에러 추적
		console.log(Allowed);
	}, [Allowed]);

	useEffect(() => {
		console.log(Posts);
	}, [Posts]);

	return (
		<Layout name={'Community'}>
			<div className='input-box'>
				{/* form 태그와 name 속성 사용X */}
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
										{/* 
											[ onChange 이벤트로 제어하지 않는 input 요소의 value 값은 defaultValue 속성으로 지정 ]
											- value: 리액트의 상태값에 관리되는 Form 요소
											- defaultValue: 일반 DOM에 의해 관리되는 Form 요소
										*/}
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

/*
	[ Local Storage ]
	- 각 브라우저마다 가지고 있는 로컬 저장공간
	- 문자값만 저장가능 (문자값이 아닌 데이터는 강제로 문자화시켜 저장해야 한다. JSON)
	- 5MB 저장 가능
	- localStorage.setItem('key', '저장할 문자값');
		-> 값 저장
	- localStorage.getItem(key);
		-> 값 불러오기
*/
