import React from 'react';
import NavItem from '../NavItem/NavItem.jsx';
import Social from '../Social/Social.jsx';
import { navItems } from './navigation.js';

import style from './Nav.module.css';

function NavBar() {
	return (
		<nav className={style.navBar}>
			<Social />
			<div className={style.navBarCont}>
				{navItems?.map((e, i) => (
					<div key={i}>
						<NavItem name={e.name} link={e.link} />
					</div>
				))}
			</div>
		</nav>
	);
}

export default NavBar;
