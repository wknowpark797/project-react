import Layout from '../common/Layout';
import Masonry from 'react-masonry-component';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';

function Gallery() {
	const frame = useRef(null);
	const counter = useRef(0);
	const [Items, setItems] = useState([]);
	const [Loader, setLoader] = useState(true);

	const getFlickr = async (opt) => {
		const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
		const key = '7f259a4112d06fbef0736c84af20f014';
		const method_interest = 'flickr.interestingness.getList';
		const method_search = 'flickr.photos.search';
		const method_user = 'flickr.people.getPhotos';
		const num = 50;
		// const myId = '198471371@N05';
		let url = '';

		if (opt.type === 'interest') url = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
		if (opt.type === 'search') url = `${baseURL}&api_key=${key}&method=${method_search}&per_page=${num}&tags=${opt.tags}`;
		if (opt.type === 'user') url = `${baseURL}&api_key=${key}&method=${method_user}&per_page=${num}&user_id=${opt.user}`;

		const result = await axios.get(url);
		console.log(result.data.photos.photo);
		setItems(result.data.photos.photo);

		// 외부 데이터가 state에 담기고 DOM이 생성되는 순간
		// 모든 img요소를 찾아서 반복처리
		const imgs = frame.current.querySelectorAll('img');
		imgs.forEach((img) => {
			// img요소에 load이벤트가 발생할 때 (소스 이미지까지 로딩이 완료될 때마다)
			img.onload = () => {
				// 내부적으로 카운터값을 1씩 증가
				++counter.current;
				console.log(counter);

				// 로딩 완료된 이미지수와 전체 이미지수가 같아지면
				if (counter.current === num * 2) {
					// 로더를 제거 후 이미지 갤러리 보임 처리
					setLoader(false);
					frame.current.classList.add('on');
				}
			};
		});
	};

	useEffect(() => {
		getFlickr({ type: 'interest' });
		// getFlickr({ type: 'search', tags: 'landscape' });
		// getFlickr({ type: 'user', user: '198471371@N05' });
	}, []);

	return (
		<Layout name={'Gallery'}>
			<div className='frame' ref={frame}>
				<Masonry elementType={'div'} options={{ transitionDuration: '0.5s' }}>
					{Items.map((item, idx) => {
						return (
							<article key={idx}>
								<div className='inner'>
									<div className='pic'>
										<img src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} alt={item.title} />
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
										<span>{item.owner}</span>
									</div>
								</div>
							</article>
						);
					})}
				</Masonry>
			</div>

			{Loader && <img className='loader' src={`${process.env.PUBLIC_URL}/img/loading.gif`} alt='loader' />}
		</Layout>
	);
}

export default Gallery;
