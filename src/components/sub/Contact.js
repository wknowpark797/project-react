import Layout from '../common/Layout';
import { useEffect, useRef } from 'react';

function Contact() {
	// CDN으로 가져온 Kakao객체는 window에 등록된다.
	// window 객체에서 직접 Kakao 상위 객체값을 가져와야 한다.
	const { kakao } = window;

	// 지도가 들어갈 프레임은 가상요소 참조를 위해 useRef로 참조 객체를 생성
	const mapContainer = useRef(null);

	// 기본지도 생성하기
	const mapOption = {
		center: new kakao.maps.LatLng(33.450701, 126.570667),
		level: 3,
	};

	// DOM이 완성된 후 Map 연결
	// 인스턴스 호출 구문은 컴포넌트 처음 마운트시 호출
	useEffect(() => {
		const mapInstance = new kakao.maps.Map(mapContainer.current, mapOption);

		// Marker 생성하기
		const marker = new kakao.maps.Marker({
			position: mapOption.center,
		});
		marker.setMap(mapInstance);
	}, []);

	return (
		<Layout name={'Contact'}>
			<div ref={mapContainer} id='map'></div>
		</Layout>
	);
}

export default Contact;
