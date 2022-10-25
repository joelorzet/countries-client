import React from 'react';
import Social from '../Social/Social';
import style from './Footer.module.css';

function Footer() {
	return (
		<footer className={style.container}>
			<Social />
			<div>Copyright © 2022 Countries. Todos los derechos reservados.</div>
		</footer>
	);
}

export default Footer;
