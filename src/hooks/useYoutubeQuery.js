import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchYoutube = async () => {
	const key = 'AIzaSyA4f3SqOYivsLVITR7K6g5K0QrKhvUZ7hw';
	const list = 'PLuYjs7JL1VFCBJV6rASuppjv0wuF4iTR7';
	const num = 10;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;

	const response = await axios.get(url);
	return response.data.items;
};

export const useYoutubeQuery = () => {
	// 'youtubeData': 중복되면 안되는 고유의 키값으로 설정
	return useQuery(['youtubeData'], fetchYoutube, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 5,
		staleTime: 1000 * 5, // 최신 데이터 상태 유지
	});
};

// 전역 데이터 저장을 캐시 저장으로 대체
// stale 상태에서 지정한 시간이 지나면 inactive 상태로 변경되고 GC에 의해 삭제
