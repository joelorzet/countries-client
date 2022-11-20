import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../../components';
import { toogleAdition } from '../../../../redux/actions/actions';
import styles from './styles/ShowCountriesSelected.module.css';

const ShowCountriesSelected = () => {
	const { countriesAdded } = useSelector((state) => state.formReducer);

	const countries = useSelector((state) =>
		state.countriesLoaded?.countriesLoaded?.filter((e) => countriesAdded[e.id])
	);

	const dispatch = useDispatch();

	if (!countries.length) return <div></div>;

	return (
		<div className={styles.container}>
			<h3 className={styles.h3}>Su elección</h3>

			<div className={styles.showcountriesselected}>
				{countries?.map((e) => (
					<Button
						value={e.name}
						key={e.id}
						onClick={() => {
							dispatch(toogleAdition(e.id));
						}}
						type='button'
						className={(countriesAdded[e.id] && 'selected') || 'btnLow'}
					/>
				))}
			</div>
		</div>
	);
};

export default ShowCountriesSelected;
