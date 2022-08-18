import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button.jsx';

import style from './Nav.module.css';

function NavBar() {
	return (
		<nav className={style.navBar}>
			<Link to='/' className={style.link}>
				<Button value='Inicio' type='button' className='secondary' />
			</Link>
			<Link to='/home' className={style.link}>
				<Button value='Home' type='button' className='secondary' />
			</Link>
			<Link to='/home/create-activity' className={style.link}>
				<Button value='Crear Actividad' type='button' className='secondary' />
			</Link>
		</nav>
	);
}

export default NavBar;
