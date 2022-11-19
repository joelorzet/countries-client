import React from 'react';
import { useSelector } from 'react-redux';
import styles from './styles/Header.module.css';

const Header = () => {
	const { countrie } = useSelector((state) => state.countrieDetail);

	if (!countrie) return <span></span>;

	return (
		<div>
			<h4>
				Bienvenidos al detalle de: <b>{countrie.name}</b>
			</h4>
			<div>
				<img className={styles.img} src={countrie.image} alt='countrieFlag' />
			</div>
		</div>
	);
};

export default Header;
