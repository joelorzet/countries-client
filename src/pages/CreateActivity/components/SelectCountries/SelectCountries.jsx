import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../../components';
import { toogleAdition } from '../../../../redux/actions/actions';
import styles from './styles/SelectCountries.module.css';

const SelectCountries = () => {
	const dispatch = useDispatch();
	const { countriesAdded } = useSelector((state) => state.formReducer);
	const countries = useSelector((e) =>
		e.countriesLoaded.countriesLoaded
			.map((e) => {
				return { name: e.name, id: e.id };
			})
			.sort((a, b) => {
				return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
			})
	);
	return (
		<div className={styles.selectcountries}>
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
	);
};

export default SelectCountries;
