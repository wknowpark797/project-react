import { useSelector } from 'react-redux';

function Pics({ Scrolled, Pos }) {
	// 스크롤시 Throttling 없이 매번 호출되어야 한다.
	// console.log(Scrolled);

	const currentPos = Scrolled - Pos;
	const base = window.innerHeight / 2;
	const modifiedPos = currentPos + base;

	const { flickr } = useSelector((store) => store.flickrReducer);
	console.log('flickr : ', flickr);

	return (
		<section id='pics' className='myScroll'>
			<h1
				style={{
					transform: `translateX(${currentPos}px)`,
				}}
			>
				FLICKR
			</h1>

			<article
				style={{
					transform: `translate(-50%, -50%) rotate(${Scrolled >= Pos - base ? modifiedPos : 0}deg) scale(${
						Scrolled >= Pos - base ? 1 + modifiedPos / 500 : 1
					})`,
					opacity: `${Scrolled >= Pos - base ? 1 - modifiedPos / 1000 : 1}`,
				}}
			></article>

			<ul>
				{flickr.map((pic, idx) => {
					if (idx >= 4) return null;

					return (
						<li key={pic.id}>
							<img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`} alt={pic.title} />
						</li>
					);
				})}
			</ul>
		</section>
	);
}

export default Pics;
