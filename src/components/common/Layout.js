// 공통 서브 페이지

import { useEffect, useRef } from 'react';

function Layout({ name, children }) {
	const frame = useRef(null);

	useEffect(() => {
		frame.current.classList.add('on');
	}, []);

	return (
		<section ref={frame} className={`content ${name}`}>
			<figure></figure>

			<div className='inner'>
				<h1>{name}</h1>

				{/* children - 호출하는 요소에서 자식요소 전달 */}
				{children}
			</div>
		</section>
	);
}

export default Layout;
