import { memo } from 'react';

function Banner() {
	console.log('Banner');

	return (
		<section id='banner' className='myScroll'>
			Banner
		</section>
	);
}

export default memo(Banner);
