import './App.css';
import { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Home from './pages/Home/Home';
import Form from './components/FormTuristicRoute/Form';
import CountrieDetail from './components/CountrieDetail/CountrieDetail.jsx';
import NavBar from './components/NavBar/Nav.jsx';
import Footer from './components/Footer/Footer';
import { PATH } from './routes.js';

function App() {
	return (
		<div className='App'>
			<Route exact path={PATH.inicio} component={LandingPage} />
			<Route path={PATH.home} component={NavBar} />
			<Route exact path={PATH.home} component={Home} />
			<Route exact path={PATH.createActivity} component={Form} />
			<Route exact path='/home/countrie-detail/:idPais' component={CountrieDetail} />
			<Route path={PATH.home} component={Footer} />
		</div>
	);
}

export default App;
