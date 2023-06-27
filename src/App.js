import { Route } from 'react-router-dom';

// common
import Footer from './components/common/Footer';
import Header from './components/common/Header';

// main
import Visual from './components/main/Visual';
import News from './components/main/News';
import Pics from './components/main/Pics';
import Vids from './components/main/Vids';
import Banner from './components/main/Banner';

// sub
import Community from './components/sub/Community';
import Contact from './components/sub/Contact';
import Department from './components/sub/Department';
import Gallery from './components/sub/Gallery';
import Member from './components/sub/Member';
import Youtube from './components/sub/Youtube';

// style
import './scss/style.scss';

function App() {
	return (
		<>
			<Header />

			<Route exact path='/'>
				<Visual />
				<News />
				<Pics />
				<Vids />
				<Banner />
			</Route>

			<Route path='/department'>
				<Department />
			</Route>

			<Route path='/community'>
				<Community />
			</Route>

			<Route path='/gallery'>
				<Gallery />
			</Route>

			<Route path='/youtube'>
				<Youtube />
			</Route>

			<Route path='/contact'>
				<Contact />
			</Route>

			<Route path='/member'>
				<Member />
			</Route>

			<Footer />
		</>
	);
}

export default App;
