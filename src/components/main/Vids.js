import { memo } from 'react';
import { useSelector } from 'react-redux';

function Vids() {
	const Vids = useSelector((store) => store.youtubeReducer.youtube);

	return (
		<section id='vids' className='myScroll'>
			Vids
		</section>
	);
}

export default memo(Vids);
