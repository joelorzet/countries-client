import React from 'react';
import { FilterByActivity } from '../FilterByActivity';
import { SortByName } from '../SortByName';
import { SortByPopulation } from '../SortByPopulation';
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
