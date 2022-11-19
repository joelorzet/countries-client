import React from 'react';
import { FilterByActivity, SortByName, SortByPopulation } from '../../components';
import styles from './styles/Sorts.module.css';

const Sorts = () => {
	return (
		<div className={styles.sorts}>
			<SortByName />
			<SortByPopulation />
			<FilterByActivity />
		</div>
	);
};

export default Sorts;
