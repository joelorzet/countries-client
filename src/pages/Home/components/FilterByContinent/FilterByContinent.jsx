import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../../../components/Button/Button';
import { defaultCountries, filterByContinent, setCurrentPage } from '../../../../redux/actions/actions';
import styles from './styles/FilterByContinent.module.css';

const FilterByContinent = () => {
	const continentNames = useSelector((state) => state.countriesLoaded.continents);
	const selectedFilter = useSelector((state) => state.countriesLoaded.selectedFilter);
	const dispatch = useDispatch();

	return (
		<div className={styles.container}>
			<p>Filtrar por continente</p>

			<div className={styles.sortBtn}>
				{continentNames?.map((e) => (
					<span key={e}>
						<Button
							value={e}
							type='button'
							onClick={() => {
								dispatch(filterByContinent(e));
								dispatch(setCurrentPage(1));
							}}
							className={(selectedFilter === e && 'selected') || 'btnLow'}
						/>
					</span>
				))}
				<Button
					value='Deafult'
					type='button'
					onClick={() => {
						dispatch(defaultCountries('default'));
						dispatch(setCurrentPage(1));
					}}
					className={(selectedFilter === 'default' && 'selected') || 'btnLow'}
				/>
			</div>
		</div>
	);
};

export default FilterByContinent;
