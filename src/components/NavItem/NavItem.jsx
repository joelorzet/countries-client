import React from 'react';
import { Link } from 'react-router-dom';
import capitalize from '../../Utils/capitalize.js';
import style from './NavItem.module.css';

function NavItem({ name, link }) {
	return (
		<Link to={link} className={style.link}>
			{capitalize(name)}
		</Link>
	);
}

export default NavItem;
