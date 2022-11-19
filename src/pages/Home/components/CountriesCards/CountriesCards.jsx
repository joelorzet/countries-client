import React from 'react';
import { Card } from '../../../../components';
import { usePagination } from '../../../../hooks/usePagination';
import styles from './styles/CountriesCards.module.css';

const CountriesCards = () => {
	const { currentPosts } = usePagination();

	return (
		<div className={styles.countriescards}>
			{currentPosts?.map((citi) => (
				<Card name={citi.name} continent={citi.continent} flag={citi.image} key={citi.id} id={citi.id} />
			))}
		</div>
	);
};

export default CountriesCards;
