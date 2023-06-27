// 공통 서브 페이지

function Layout({ name, children }) {
	return (
		<section className={`content ${name}`}>
			<figure></figure>

			<div className='inner'>
				<h1>{name}</h1>

				{/* children - 호출하는 요소에 자식요소 전달 */}
				{children}
			</div>
		</section>
	);
}

export default Layout;
