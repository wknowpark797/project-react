import { Route, Switch } from 'react-router-dom';

// common
import Footer from './components/common/Footer';
import Header from './components/common/Header';

// sub
import Community from './components/sub/Community';
import Contact from './components/sub/Contact';
import Department from './components/sub/Department';
import Gallery from './components/sub/Gallery';
import Member from './components/sub/Member';
import Youtube from './components/sub/Youtube';

// style
import './scss/style.scss';
import Main from './components/main/Main';

function App() {
	return (
		<>
			{/* Switch는 내부에 중복되는 라우트 경로가 있을 때 먼저 작성된 라우터를 채택하고 나머지는 무시 */}
			<Switch>
				<Route exact path='/' component={Main} />

				{/* 컴포넌트에 props 전달이 있을 경우의 축약형 */}
				<Route path='/' render={() => <Header type={'sub'} />} />
			</Switch>

			{/* 기본 축약형 */}
			<Route path='/department' component={Department} />
			{/* <Route path='/department'>
				<Department />
			</Route> */}

			<Route path='/community' component={Community} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/contact' component={Contact} />
			<Route path='/member' component={Member} />

			<Footer />
		</>
	);
}

export default App;
