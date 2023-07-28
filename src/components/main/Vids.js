import { memo, useRef } from 'react';
// import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

import { useYoutubeQuery } from '../../hooks/useYoutubeQuery';

function BtnRolling() {
	const btnStart = useRef(null);
	const btnStop = useRef(null);
	const swiper = useSwiper();

	return (
		<nav className='controls'>
			<FontAwesomeIcon
				ref={btnStart}
				icon={faPlay}
				onClick={() => {
					btnStart.current.classList.add('on');
					btnStop.current.classList.remove('on');
					swiper.autoplay.start();
				}}
			/>
			<FontAwesomeIcon
				ref={btnStop}
				icon={faPause}
				onClick={() => {
					btnStart.current.classList.remove('on');
					btnStop.current.classList.add('on');
					swiper.autoplay.stop();
				}}
			/>
		</nav>
	);
}

function Vids() {
	// const Vids = useSelector((store) => store.youtube.data);
	const { data: Vids, isSuccess } = useYoutubeQuery();
	console.log('Vids data: ', Vids);

	return (
		<section id='vids' className='myScroll'>
			<Swiper
				modules={[Autoplay, Pagination, Navigation]}
				loop={true}
				spaceBetween={30}
				slidesPerView={1}
				centeredSlides={true}
				autoplay={{ delay: 2000, disableOnInteraction: true }}
				pagination={{ clickable: true }}
				navigation={true}
				breakpoints={{
					1200: {
						slidesPerView: 3,
						spaceBetween: 50,
					},
				}}
			>
				<BtnRolling />

				{isSuccess &&
					Vids.map((vid, idx) => {
						if (idx >= 5) return null;

						return (
							<SwiperSlide key={idx}>
								<div className='inner'>
									<div className='pic'>
										<img src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
									</div>
									<h2>
										{vid.snippet.title.length >= 30 ? vid.snippet.title.substr(0, 30) + '...' : vid.snippet.title}
									</h2>
									<p>
										{vid.snippet.description.length >= 100
											? vid.snippet.description.substr(0, 100) + '...'
											: vid.snippet.description}
									</p>
								</div>
							</SwiperSlide>
						);
					})}
			</Swiper>
		</section>
	);
}

export default memo(Vids);
