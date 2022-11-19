import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input } from '../../../../components';
import { getCountriesBySearch, setCurrentPage } from '../../../../redux/actions/actions';
import styles from './styles/SearchBar.module.css';

const SearchBar = () => {
	const [data, setData] = useState({ search: '' });

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(setCurrentPage(1));
		dispatch(getCountriesBySearch(data.search));

		e.target[0].value = '';
	};

	const clearInput = () => {
		setError(null);
		setData({ search: '' });
	};
	return (
		<div>
			<form onSubmit={submitHandler}>
				<Input
					name='search'
					type='text'
					placeholder='Buscar paises...'
					state={data}
					setState={setData}
					className='normal'
					label='Buscar'
				/>
				<div className={styles.buttons}>
					<Button value='Limpiar' type='button' onClick={() => clearInput()} className='secondary' />
					<Button value='Buscar' type='submit' className='secondary' />
				</div>
			</form>
		</div>
	);
};

export default SearchBar;
