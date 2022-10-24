import React from 'react';
import Button from '../Button/Button.jsx';
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css';
import image from './mundo.png';

function LandingPage() {
	return (
		<div className={style.landingContainer}>
			<h1 className={style.h1}>Bienvenidos a Best World APP</h1>

			<div className={style.content}>
				<Link to='/home'>
					<Button value='Vamos allá!' type='button' className='primary' />
				</Link>

				<div>
					<img className={style.imgContainer} src={image} alt='mapa mundial' />
				</div>
			</div>
		</div>
	);
}

export default LandingPage;
