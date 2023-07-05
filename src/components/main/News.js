import { useState, useEffect } from 'react';

function News() {
	const dummy = [
		{ title: 'Hello5', content: 'Hello5 description in detail.' },
		{ title: 'Hello4', content: 'Hello4 description in detail.' },
		{ title: 'Hello3', content: 'Hello3 description in detail.' },
		{ title: 'Hello2', content: 'Hello2 description in detail.' },
		{ title: 'Hello1', content: 'Hello1 description in detail.' },
	];

	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return dummy;
	};

	const [Posts] = useState(getLocalData());

	useEffect(() => {
		localStorage.setItem('post', JSON.stringify(Posts));
	}, []);

	return (
		<section id='news' className='myScroll'>
			{Posts.map((post, idx) => {
				if (idx >= 4) return null;

				return (
					<article key={idx}>
						<h3>{post.title}</h3>
						<p>{post.content}</p>
					</article>
				);
			})}
		</section>
	);
}

export default News;
