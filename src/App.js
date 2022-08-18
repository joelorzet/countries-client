import './App.css';
import { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Home from './components/Home/Home.jsx';
import Form from './components/FormTuristicRoute/Form';
import CountrieDetail from './components/CountrieDetail/CountrieDetail.jsx';
import NavBar from './components/NavBar/Nav.jsx';

function App() {
	return (
		<div className='App'>
			<Route exact path='/' component={LandingPage} />
			<Route path='/home' component={NavBar} />
			<Route exact path='/home' component={Home} />
			<Route exact path='/home/create-activity' component={Form} />
			<Route exact path='/home/countrie-detail/:idPais' component={CountrieDetail} />
		</div>
	);
}

export default App;
