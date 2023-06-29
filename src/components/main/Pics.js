function Pics({ Scrolled, Pos }) {
	console.log(Scrolled);

	return (
		<section id='pics' className='myScroll'>
			<h1
				style={{
					transform: `translateX(${(Scrolled - Pos) * 2}px)`,
				}}
			>
				FLICKR
			</h1>
		</section>
	);
}

export default Pics;
