import Layout from '../common/Layout';
import Modal from '../common/Modal';
import Masonry from 'react-masonry-component';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as types from '../../redux/actionType';

/*
	[ Gallery 컴포넌트에서 전역 비동기 데이터를 변경하는 방법 ]
	dispatch로 액션 객체를 보낼 때 Opt(옵션)도 같이 전달한다.
	- 각각의 함수(showInterest, showSearch, showMine, showUser)가 실행될때마다 내부적으로 Opt 지역 state 변경
	- useEffect에 Opt state값을 의존성 배열로 등록해서 dispatch로 Opt가 바뀔때마다 action객체를 전달하도록 설정
*/

function Gallery() {
	const isUser = useRef(true); // user 데이터 재호출 방지
	const searchInput = useRef(null);
	const btnSet = useRef(null);
	const enableEvent = useRef(true); // 재이벤트 방지
	const frame = useRef(null);
	const counter = useRef(0);
	const firstLoaded = useRef(true);
	const [Loader, setLoader] = useState(true);

	const modal = useRef(null);
	const [ModalIndex, setModalIndex] = useState(0);

	const dispatch = useDispatch();
	const Items = useSelector((store) => store.flickrReducer.flickr);
	const [Opt, setOpt] = useState({ type: 'user', user: '198471371@N05' }); // 페이지를 새로고침할 때 myGallery를 default로 출력

	/*
		기존 갤러리 초기화 함수
		- 이벤트 발생시 각각 interest, mine, search, userGallery를 호출할 때마다 기존 갤러리를 사라지게하고 로딩바를 노출시키는 공통 초기화 함수
	*/
	const resetGallery = (e) => {
		const btns = btnSet.current.querySelectorAll('button');

		btns.forEach((btn) => btn.classList.remove('on'));
		e.target.classList.add('on');

		enableEvent.current = false;
		setLoader(true);
		frame.current.classList.remove('on');
	};

	const showInterest = (e) => {
		// 모션 진행중 재이벤트 방지
		if (!enableEvent.current) return;
		if (e.target.classList.contains('on')) return;

		resetGallery(e); // 기존 갤러리 초기화

		// action객체에 추가로 전달해야 할 옵션을 Opt state로 변경처리
		setOpt({ type: 'interest' });
		isUser.current = false;
	};

	const showMine = (e) => {
		if (!enableEvent.current) return;
		if (e.target.classList.contains('on')) return;

		resetGallery(e);

		setOpt({ type: 'user', user: '198471371@N05' });
	};

	const showSearch = (e) => {
		const tag = searchInput.current.value.trim();
		if (tag === '') return alert('검색어를 입력하세요.');
		if (!enableEvent.current) return;

		resetGallery(e);

		setOpt({ type: 'search', tags: tag });
		searchInput.current.value = '';
		isUser.current = false;
	};

	// action객체에 추가로 전달되어야 할 Opt값이 변경될 때마다 새롭게 action객체를 생성해서 reducer에 전달
	useEffect(() => {
		dispatch({ type: types.FLICKR.start, opt: Opt });
	}, [Opt, dispatch]);

	// 전역 state 정보값이 변경될 때마다 구문 실행 (이벤트 기능 재활성화, 이미지 로딩 이벤트 후 갤러리 노출, 버튼 활성화)
	useEffect(() => {
		counter.current = 0; // 재실행 될 때마다 counter값을 초기화

		// 결과값이 없을 때 && 처음 mount 상태가 아닐 때 경고창 출력
		if (Items.length === 0 && !firstLoaded.current) {
			setLoader(false);
			frame.current.classList.add('on');

			const btnMine = btnSet.current.children;
			btnMine[1].classList.add('on');

			setOpt({ type: 'user', user: '198471371@N05' });
			enableEvent.current = true;

			return alert('이미지 결과값이 없습니다.');
		}
		firstLoaded.current = false;

		/*
			1. 외부 데이터가 state에 담기고 DOM이 생성되는 순간 모든 img 요소를 찾아서 반복처리
			2. img요소에 load이벤트가 발생할 때(소스 이미지까지 로딩이 완료될때마다) 내부적으로 counter값을 1씩 증가
			3. 로딩 완료된 이미지수와 전체 이미지수가 같아지면 로더를 제거 후 이미지 갤러리 보임 처리
		*/
		const imgs = frame.current.querySelectorAll('img');

		imgs.forEach((img) => {
			img.onload = () => {
				++counter.current;
				console.log(counter);

				/*
					[ 결과값의 개수가 적게 리턴되는 문제 발생 ]
					특정 사용자 아이디로 갤러리를 출력할 때 counter개수가 2개 부족한 이유

					- 이벤트 발생시점에 출력될 이미지 DOM요소 중에서 이미 해당 사용자의 이미지와 프로필 이미지 소스 2개가 캐싱이 완료
					- 따라서 실제 생성된 이미지 DOM의 개수는 20개이지만 캐싱이 완료된 2개의 소스 이미지 때문에 onload 이벤트는 18번만 발생
					- 캐싱된 이미지는 onload 이벤트를 타지 않는다.
				*/
				if (counter.current === imgs.length - 2) {
					setLoader(false);
					frame.current.classList.add('on');
					enableEvent.current = true;

					/*
						모션 진행중 재이벤트 방지시 모션이 끝날때까지 이벤트를 방지해도 모션이 끝나는 순간 이벤트가 많이 발생하면 특정값이 바뀌는 순간보다 이벤트가 더 빨리 들어가 오류가 발생할 경우
						-> 해결방법: 물리적으로 이벤트 호출을 지연시켜 마지막에 발생한 이벤트만 동작처리 (Debouncing)
						
						[ 단시간에 많이 발생하는 이벤트의 함수 호출을 줄이는 방법 ]
						1. Debouncing: 이벤트 발생시 바로 호출하는 것이 아닌 일정시간 시간을 두고 마지막에 발생한 이벤트만 호출
						2. throttling: 이벤트 발생시 호출되는 함수를 줄인다.
					*/
				}
			};
		});
	}, [Items]);

	return (
		<>
			<Layout name={'Gallery'}>
				<div className='btnSet' ref={btnSet}>
					<button onClick={showInterest}>Interest Gallery</button>
					<button className='on' onClick={showMine}>
						My Gallery
					</button>
				</div>

				<div className='search-box'>
					<input
						type='text'
						placeholder='검색어를 입력하세요.'
						ref={searchInput}
						onKeyPress={(e) => e.key === 'Enter' && showSearch(e)}
					/>
					<button onClick={showSearch}>Search</button>
				</div>

				<div className='frame' ref={frame}>
					<Masonry elementType={'div'} options={{ transitionDuration: '0.5s' }}>
						{Items.map((item, idx) => {
							return (
								<article key={idx}>
									<div className='inner'>
										<div
											className='pic'
											onClick={() => {
												modal.current?.open();
												setModalIndex(idx);
											}}
										>
											<img
												src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
												alt={item.title}
											/>
										</div>
										<h2>{item.title}</h2>
										<div className='profile'>
											<img
												src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`}
												alt={item.owner}
												onError={(e) => {
													e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif');
												}}
											/>
											<span
												onClick={(e) => {
													if (isUser.current) return;
													isUser.current = true;
													setLoader(true);
													frame.current.classList.remove('on');
													setOpt({ type: 'user', user: e.target.innerText });
												}}
											>
												{item.owner}
											</span>
										</div>
									</div>
								</article>
							);
						})}
					</Masonry>
				</div>

				{Loader && <img className='loader' src={`${process.env.PUBLIC_URL}/img/loading.gif`} alt='loader' />}
			</Layout>

			<Modal ref={modal}>
				{/* 첫번째 렌더링 사이클 이후에 적용되도록 처리 - 체이닝 적용 */}
				<img
					src={`https://live.staticflickr.com/${Items[ModalIndex]?.server}/${Items[ModalIndex]?.id}_${Items[ModalIndex]?.secret}_b.jpg`}
					alt={Items[ModalIndex]?.title}
				/>
			</Modal>
		</>
	);
}

export default Gallery;
