import React from 'react';
import { useSelector } from 'react-redux';
import styles from './styles/CountrieData.module.css';

const CountrieData = () => {
	const { countrie } = useSelector((state) => state.countrieDetail);

	if (!countrie) return <span></span>;

	return (
		<div>
			<div className={styles.principal}>
				<p>
					País: <b>{countrie.name}</b>
				</p>
				<p>
					Continente: <b>{countrie.continent}</b>
				</p>
				<p>
					Subregión: <b>{countrie.subRegion}</b>
				</p>
				<p>
					Capital: <b>{countrie.capital}</b>
				</p>
			</div>

			<p>
				Área: <b>{(countrie.area / 1000000).toFixed(2)}</b> millones de km<sup>2</sup>
			</p>
			<p>
				Población: <b>{countrie.population}</b>
			</p>
		</div>
	);
};

export default CountrieData;
