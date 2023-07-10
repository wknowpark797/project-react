import { memo } from 'react';

function Vids() {
	console.log('Vids');

	return (
		<section id='vids' className='myScroll'>
			Vids
		</section>
	);
}

export default memo(Vids);
