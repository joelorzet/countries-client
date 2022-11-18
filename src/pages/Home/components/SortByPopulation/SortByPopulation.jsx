import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../../components/Button/Button';
import {
	sortCountries,
	SORT_BY_POPULATION_ASC,
	SORT_BY_POPULATION_DES,
} from '../../../../redux/actions/actions';
import styles from './styles/SortByPopulation.module.css';

const SortByPopulation = ({ sort }) => {
	const dispatch = useDispatch();
	const selectedSort = useSelector((state) => state.countriesLoaded.selectedSort);

	return (
		<div className={styles.container}>
			<p>Ordenar por cantidad de población</p>
			<div className={styles.sortBtn}>
				<Button
					value='May-Men'
					type='button'
					onClick={() => {
						dispatch(sortCountries(SORT_BY_POPULATION_ASC));
						sort('mm');
					}}
					className={(selectedSort === SORT_BY_POPULATION_ASC && 'selected') || 'btnLow'}
				/>
				<Button
					value='Men-May'
					type='button'
					onClick={() => {
						dispatch(sortCountries(SORT_BY_POPULATION_DES));
						sort('mn');
					}}
					className={(selectedSort === SORT_BY_POPULATION_DES && 'selected') || 'btnLow'}
				/>
			</div>
		</div>
	);
};

export default SortByPopulation;
