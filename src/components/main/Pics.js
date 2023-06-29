function Pics({ Scrolled, Pos }) {
	// 스크롤시 Throttling 없이 매번 호출되어야 한다.
	// console.log(Scrolled);

	const currentPos = Scrolled - Pos;
	const base = window.innerHeight / 2;
	const modifiedPos = currentPos + base;

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
					transform: `translate(-50%, -50%) rotate(${
						Scrolled >= Pos - base ? modifiedPos : 0
					}deg) scale(${Scrolled >= Pos - base ? 1 + modifiedPos / 500 : 1})`,
					opacity: `${Scrolled >= Pos - base ? 1 - modifiedPos / 1000 : 1}`,
				}}
			></article>
		</section>
	);
}

export default Pics;
