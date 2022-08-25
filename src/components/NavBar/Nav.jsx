import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button.jsx';
import gitIcon from './gitIcon.svg';
import linkedin from './linkedin.svg';

import style from './Nav.module.css';

function NavBar() {
	return (
		<nav className={style.navBar}>
			<div className={style.navBarCont}>
				<Link to='/' className={style.link}>
					<Button value='Inicio' type='button' className='secondary' />
				</Link>
				<Link to='/home' className={style.link}>
					<Button value='Home' type='button' className='secondary' />
				</Link>
				<Link to='/home/create-activity' className={style.link}>
					<Button value='Crear Actividad' type='button' className='secondary' />
				</Link>
			</div>

			<div className={style.navBarCont}>
				<a href='https://github.com/joelorzet' target='_blanck' className={style.link}>
					GitHub
					<img src={gitIcon} alt='git-Icon' className={style.icon} />
				</a>

				<a href='https://www.linkedin.com/in/joelorzet/' target='_blanck' className={style.link}>
					LinkedIn
					<img src={linkedin} alt='linkedin-Icon' className={style.icon} />
				</a>
			</div>
		</nav>
	);
}

export default NavBar;
