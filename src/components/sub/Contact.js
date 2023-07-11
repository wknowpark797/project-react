import Layout from '../common/Layout';
import ContactForm from './ContactForm';
import { useState, useEffect, useRef, useMemo } from 'react';

function Contact() {
	// 지도가 들어갈 프레임은 가상요소 참조를 위해 useRef로 참조 객체를 생성
	const mapContainer = useRef(null);
	const [Traffic, setTraffic] = useState(false);
	const [Location, setLocation] = useState(null);
	const [Index, setIndex] = useState(0);

	/*
		window 객체에서 직접 Kakao 상위 객체값을 가져온다.
		-> CDN으로 가져온 Kakao객체는 window에 등록
	*/
	const { kakao } = window;
	const info = useRef([
		{
			title: '삼성역 코엑스',
			latlng: new kakao.maps.LatLng(37.51100661425726, 127.06162026853143),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '넥슨 본사',
			latlng: new kakao.maps.LatLng(37.40211707077346, 127.10344953763003),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker2.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '서울 시청',
			latlng: new kakao.maps.LatLng(37.5662952, 126.9779451),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker3.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
	]);

	/*
		[ Marker 생성하기 ]
		아래 다섯개의 변수값들은 useEffect문에서 인스턴스 생성할때만 필요한 정보값이므로 미리 읽히도록 useEffect바깥에 배치
	*/
	/*
		[ marker의 정보값을 useMemo로 메모이제이션 해야 하는 이유 ]
		해당 정보값이 바뀌지 않는 static한 값이 아니고 state에 의해 계속 변경되는 값이기 때문에
		내부에 있는 index state값이 바뀔때마다 임시로 메모이제이션을 풀기 위해서 useMemo에 Index State를 의존성 배열에 등록해야 하기 때문

		-> static한 값의 경우 useRef로 처리
	*/
	const marker = useMemo(() => {
		return new kakao.maps.Marker({
			position: info.current[Index].latlng,
			image: new kakao.maps.MarkerImage(
				info.current[Index].imgSrc,
				info.current[Index].imgSize,
				info.current[Index].imgPos
			),
		});
	}, [Index, kakao]);

	/*
		브라우저가 해야할 일에 대한 부분을 useEffect에 작성해준다.
		- 데이터 Fetching
		- 외부 API 연결
		- window event 등록
	*/
	useEffect(() => {
		mapContainer.current.innerHTML = ''; // 지도 초기화

		/*
			[ 기본지도 생성 ]
			인스턴스 호출 구문은 컴포넌트를 처음 마운트시 호출 (DOM이 완성된 후 Map 연결)
		*/
		const mapInstance = new kakao.maps.Map(mapContainer.current, { center: info.current[Index].latlng, level: 3 });

		marker.setMap(mapInstance);

		mapInstance.addControl(new kakao.maps.MapTypeControl(), kakao.maps.ControlPosition.TOPRIGHT);
		mapInstance.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);

		// 지역변수인 mapInstance값을 다른 함수에서도 활용하기 위해서 Location state에 해당 인스턴스 값 저장
		setLocation(mapInstance);

		// 지도 휠 기능 비활성화
		mapInstance.setZoomable(false);

		// setCenter가 호출될 때 내부적으로 Index state값에 의존하고 있기 때문에 useEffect 안쪽에서 setCenter를 정의하고 호출한다.
		const setCenter = () => {
			mapInstance.setCenter(info.current[Index].latlng);
		};
		window.addEventListener('resize', setCenter);
		return () => window.removeEventListener('resize', setCenter);
	}, [Index, marker, kakao]);

	useEffect(() => {
		// Location state에 담겨있는 맵 인스턴스로부터 traffic 레이어 호출 구문 처리 (Traffic state가 변경될 때마다)
		// 첫렌더링 사이클에서 Location값이 null이므로 Optional Chaining을 사용하여 해당 값이 담기는 두번째 렌더링 사이클부터 동작하도록 처리
		Traffic
			? Location?.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: Location?.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic, Location, kakao]);

	return (
		<Layout name={'Contact'}>
			<div ref={mapContainer} id='map'></div>
			<button onClick={() => setTraffic(!Traffic)}>{Traffic ? 'Traffic ON' : 'Traffic OFF'}</button>

			<ul className='branch'>
				{info.current.map((item, idx) => {
					return (
						<li key={idx} onClick={() => setIndex(idx)} className={idx === Index ? 'on' : ''}>
							{item.title}
						</li>
					);
				})}
			</ul>

			<ContactForm />
		</Layout>
	);
}

export default Contact;
