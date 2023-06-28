import Header from '../common/Header';
import Banner from './Banner';
import News from './News';
import Pics from './Pics';
import Vids from './Vids';
import Visual from './Visual';
import Btns from './Btns';

function Main() {
	return (
		<main>
			{/* 메인 전용 라우터 Header */}
			<Header type={'main'}></Header>
			<Visual />
			<News />
			<Pics />
			<Vids />
			<Banner />

			<Btns />
		</main>
	);
}

export default Main;
