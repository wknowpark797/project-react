import Layout from '../common/Layout';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Youtube() {
	const [VideoList, setVideoList] = useState([]);
	console.log(VideoList);

	useEffect(() => {
		const key = 'AIzaSyDwb_57BfoNHLxlZ-Mwn2O3VNVt2tFNNMw';
		const list = 'PLEJLcTMBRARd4AKwM7CM_0gf2mKviNR3J';
		const num = 10;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;

		// TODO: async await로 변환 (useEffect 밖에서 함수생성 후 호출)
		axios.get(url).then((data) => {
			setVideoList(data.data.items);
		});
	}, []);

	return (
		<Layout name={'Youtube'}>
			{VideoList.map((video, idx) => {
				return (
					<article key={idx}>
						<h2>{video.snippet.title.length > 50 ? video.snippet.title.substr(0, 50) + '...' : video.snippet.title}</h2>
						<div className='txt'>
							<p>{video.snippet.description.length > 200 ? video.snippet.description.substr(0, 200) + '...' : video.snippet.description}</p>
							<span>{video.snippet.publishedAt.split('T')[0].split('-').join('.')}</span>
						</div>
						<div className='pic'>
							<img src={video.snippet.thumbnails.standard.url} alt={video.snippet.title} />
						</div>
					</article>
				);
			})}
		</Layout>
	);
}

export default Youtube;
