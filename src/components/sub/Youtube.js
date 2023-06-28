import Layout from '../common/Layout';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import Modal from '../common/Modal';

function Youtube() {
	const modal = useRef(null);
	const [VideoList, setVideoList] = useState([]);
	console.log(VideoList);

	const [SelectIdx, setSelectIdx] = useState(0);

	const fetchYoutube = async () => {
		const key = 'AIzaSyDwb_57BfoNHLxlZ-Mwn2O3VNVt2tFNNMw';
		const list = 'PLEJLcTMBRARd4AKwM7CM_0gf2mKviNR3J';
		const num = 10;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;

		// async await로 변환 (useEffect 밖에서 함수생성 후 호출)
		const result = await axios.get(url);
		setVideoList(result.data.items);
	};

	useEffect(() => fetchYoutube(), []);

	return (
		<>
			<Layout name={'Youtube'}>
				{VideoList.map((video, idx) => {
					return (
						<article key={idx}>
							<h2>
								{video.snippet.title.length > 50
									? video.snippet.title.substr(0, 50) + '...'
									: video.snippet.title}
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
					title={VideoList[SelectIdx]?.id}
					src={`https://www.youtube.com/embed/${VideoList[SelectIdx]?.snippet.resourceId.videoId}`}
				></iframe>
			</Modal>
		</>
	);
}

export default Youtube;
