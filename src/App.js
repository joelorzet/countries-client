import './App.css';
import { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import NavBar from './components/NavBar/Nav.jsx';
import Footer from './components/Footer/Footer';
import { PATH } from './routes.js';
import { CreateActivity, CountriesDetail, Home } from './pages';

function App() {
	return (
		<div className='App'>
			<Route exact path={PATH.inicio} component={LandingPage} />
			<Route path={PATH.home} component={NavBar} />
			<Route exact path={PATH.home} component={Home} />
			<Route exact path={PATH.createActivity} component={CreateActivity} />
			<Route exact path='/home/countrie-detail/:idPais' component={CountriesDetail} />
			<Route path={PATH.home} component={Footer} />
		</div>
	);
}

export default App;
