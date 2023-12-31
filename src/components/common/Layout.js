// 공통 서브 페이지
import React from 'react';
import { useEffect, useRef } from 'react';

function Layout({ name, children, txt = 'Default', bg }) {
	const frame = useRef(null);

	useEffect(() => {
		frame.current.classList.add('on');
	}, []);

	return (
		<section ref={frame} className={`content ${name}`}>
			<figure style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/${bg})` }}></figure>

			<div className='inner'>
				<h1>{name}</h1>
				<h2>
					{/* 
						구분자로 문자값을 배열로 분리 후 반복을 돌면서 br태그 추가
						-> 반복요소이므로 key 속성을 적용하기 위해서 React.Fragment 형태로 wrapping 처리
					*/}
					{txt.split('-').map((el, idx) => {
						return (
							<React.Fragment key={idx}>
								{el}
								<br />
							</React.Fragment>
						);
					})}
				</h2>

				{/* children - 호출하는 요소에서 자식요소 전달 */}
				{children}
			</div>
		</section>
	);
}

export default Layout;
