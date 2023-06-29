import Layout from '../common/Layout';
import { useState, useEffect, useRef } from 'react';

function Contact() {
	/*
		window 객체에서 직접 Kakao 상위 객체값을 가져온다.
		-> CDN으로 가져온 Kakao객체는 window에 등록
	*/
	const { kakao } = window;
	const mapOption = {
		center: new kakao.maps.LatLng(33.450701, 126.570667),
		level: 3,
	};
	const [Traffic, setTraffic] = useState(false);

	// 지도가 들어갈 프레임은 가상요소 참조를 위해 useRef로 참조 객체를 생성
	const mapContainer = useRef(null);

	useEffect(() => {
		// 기본지도 생성
		// 인스턴스 호출 구문은 컴포넌트를 처음 마운트시 호출 (DOM이 완성된 후 Map 연결)
		const mapInstance = new kakao.maps.Map(mapContainer.current, mapOption);

		// Marker 생성하기
		const imageSrc = `${process.env.PUBLIC_URL}/img/marker1.png`;
		const imageSize = new kakao.maps.Size(232, 99);
		const imageOption = { offset: new kakao.maps.Point(116, 99) };
		const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

		const marker = new kakao.maps.Marker({
			position: mapOption.center,
			image: markerImage,
		});
		marker.setMap(mapInstance);

		Traffic
			? mapInstance.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: mapInstance.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	return (
		<Layout name={'Contact'}>
			<div ref={mapContainer} id='map'></div>
			<button onClick={() => setTraffic(!Traffic)}>{Traffic ? 'Traffic ON' : 'Traffic OFF'}</button>
		</Layout>
	);
}

export default Contact;
