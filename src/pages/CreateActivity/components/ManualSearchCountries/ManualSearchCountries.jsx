import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input } from '../../../../components';
import { toogleAdition } from '../../../../redux/actions/actions';
import styles from './styles/ManualSearchCountries.module.css';

const ManualSearchCountries = () => {
	const [search, setSearch] = useState({});
	const { countriesLoaded } = useSelector((state) => state.countriesLoaded);
	const dispatch = useDispatch();
	const { countriesAdded } = useSelector((state) => state.formReducer);

	const showButtonsCities = Object.keys(search).length > 0 ? true : false;
	const showContainerCities = search?.buttonSearch?.length > 0 ? true : false;

	return (
		<div className={styles.manualsearchcountries}>
			<Input
				label='Buscar manualmente'
				name='buttonSearch'
				placeholder='Ingrese su búsqueda'
				className='secondary'
				state={search}
				setState={setSearch}
			/>

			{showContainerCities && (
				<div className={styles.btnSearch}>
					{showButtonsCities &&
						countriesLoaded
							.filter((e) => e.name.toLowerCase().includes(search.buttonSearch.toLowerCase()))
							.map((e) => (
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
			)}
		</div>
	);
};

export default ManualSearchCountries;
