import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../../components';
import { filterByActivity, setCurrentPage } from '../../../../redux/actions/actions';
import styles from './styles/FilterByActivity.module.css';

const FilterByActivity = () => {
	const dispatch = useDispatch();
	const selectedFilter = useSelector((state) => state.countriesLoaded.selectedFilter);
	const activities = useSelector((state) => state.countriesLoaded.activities);
	const activitiesNames = [...new Set(activities?.map((e) => e.name.toLowerCase()))];

	const showActivitiesFilter = activities.length > 0 ? true : false;

	if (!showActivitiesFilter) return <span></span>;

	return (
		<div className={styles.filterbyactivity}>
			<p>Filtrar por Actividad</p>

			<div className={styles.sortBtn}>
				{activitiesNames?.map((e) => (
					<Button
						value={e}
						key={e}
						onClick={() => {
							dispatch(filterByActivity(e));
							dispatch(setCurrentPage(1));
						}}
						className={(selectedFilter === e && 'selected') || 'btnLow'}
					/>
				))}
			</div>
		</div>
	);
};

export default FilterByActivity;
