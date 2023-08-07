import Layout from '../common/Layout';
import { useState, useEffect, useRef } from 'react';
// import { useSelector } from 'react-redux';
import Modal from '../common/Modal';

import { useYoutubeQuery } from '../../hooks/useYoutubeQuery';

function Youtube() {
	const modal = useRef(null);
	const [SelectIdx, setSelectIdx] = useState(0);
	// const VideoList = useSelector((store) => store.youtube.data);
	const [Mounted, setMounted] = useState(true);
	const { data: VideoList, isSuccess } = useYoutubeQuery();

	useEffect(() => {
		return () => setMounted(false);
	}, []);

	return (
		<>
			<Layout name={'Youtube'} bg={'Youtube.jpg'}>
				{Mounted &&
					isSuccess &&
					VideoList.map((video, idx) => {
						return (
							<article key={idx}>
								<h2>
									{video.snippet.title.length > 50 ? video.snippet.title.substr(0, 50) + '...' : video.snippet.title}
								</h2>
								<div className='txt'>
									<p>
										{video.snippet.description.length > 200
											? video.snippet.description.substr(0, 200) + '...'
											: video.snippet.description}
									</p>
									<span>{video.snippet.publishedAt.split('T')[0].split('-').join('.')}</span>
								</div>
								<div
									className='pic'
									onClick={() => {
										console.log(modal);
										modal.current.open();
										setSelectIdx(idx); // 썸네일 클릭시 클릭한 요소의 index로 모달 출력
									}}
								>
									<img src={video.snippet.thumbnails.standard.url} alt={video.snippet.title} />
								</div>
							</article>
						);
					})}
			</Layout>

			<Modal ref={modal}>
				{/* 
					첫번째 렌더링에서 초기값이 담긴 후 두번째 렌더링부터 데이터가 담기게 된다.
					첫번째 렌더링에서 VideoList는 빈객체이므로 빈객체의 요소에 접근하기 때문에 에러 발생
					-> 옵셔널 체이닝 (에러 해결)
						- 첫번째 렌더링에서 객체에 값이 없을 때 에러 없이 무시하도록 처리
				*/}
				<iframe
					title={isSuccess && VideoList[SelectIdx]?.id}
					src={`https://www.youtube.com/embed/${isSuccess && VideoList[SelectIdx]?.snippet.resourceId.videoId}`}
				></iframe>
			</Modal>
		</>
	);
}

export default Youtube;
