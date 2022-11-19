import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../../components';
import { usePagination } from '../../../../hooks/usePagination';
import { setCurrentPage, sortCountries, SORT_A_TO_Z, SORT_Z_TO_A } from '../../../../redux/actions/actions';
import styles from './styles/SortByName.module.css';

const SortByName = () => {
	const dispatch = useDispatch();
	const selectedSort = useSelector((state) => state.countriesLoaded.selectedSort);
	const { currentPage, setSort } = usePagination();

	return (
		<div className={styles.container}>
			<p>Ordenar alfabeticamente</p>
			<div className={styles.sortBtn}>
				<Button
					value='A-Z'
					type='button'
					onClick={() => {
						dispatch(sortCountries(SORT_A_TO_Z));
						dispatch(setCurrentPage(currentPage));
						setSort('az');
					}}
					className={(selectedSort === SORT_A_TO_Z && 'selected') || 'btnLow'}
				/>
				<Button
					value='Z-A'
					type='button'
					onClick={() => {
						dispatch(sortCountries(SORT_Z_TO_A));
						dispatch(setCurrentPage(currentPage));
						setSort('za');
					}}
					className={(selectedSort === SORT_Z_TO_A && 'selected') || 'btnLow'}
				/>
			</div>
		</div>
	);
};

export default SortByName;
