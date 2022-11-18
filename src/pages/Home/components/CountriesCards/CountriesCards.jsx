import React from 'react';
import Card from '../../../../components/Card/Card';
import styles from './styles/CountriesCards.module.css';

const CountriesCards = ({ countries }) => {
	return (
		<div className={styles.countriescards}>
			{countries?.map((citi) => (
				<Card name={citi.name} continent={citi.continent} flag={citi.image} key={citi.id} id={citi.id} />
			))}
		</div>
	);
};

export default CountriesCards;
