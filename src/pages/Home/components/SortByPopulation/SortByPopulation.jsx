import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../../components';
import { usePagination } from '../../../../hooks/usePagination';
import {
	sortCountries,
	SORT_BY_POPULATION_ASC,
	SORT_BY_POPULATION_DES,
} from '../../../../redux/actions/actions';
import styles from './styles/SortByPopulation.module.css';

const SortByPopulation = () => {
	const dispatch = useDispatch();
	const selectedSort = useSelector((state) => state.countriesLoaded.selectedSort);
	const { setSort } = usePagination();

	return (
		<div className={styles.container}>
			<p>Ordenar por cantidad de población</p>
			<div className={styles.sortBtn}>
				<Button
					value='May-Men'
					type='button'
					onClick={() => {
						dispatch(sortCountries(SORT_BY_POPULATION_ASC));
						setSort('mm');
					}}
					className={(selectedSort === SORT_BY_POPULATION_ASC && 'selected') || 'btnLow'}
				/>
				<Button
					value='Men-May'
					type='button'
					onClick={() => {
						dispatch(sortCountries(SORT_BY_POPULATION_DES));
						setSort('mn');
					}}
					className={(selectedSort === SORT_BY_POPULATION_DES && 'selected') || 'btnLow'}
				/>
			</div>
		</div>
	);
};

export default SortByPopulation;
