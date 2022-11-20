import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
	addActivity,
	clearCountriesLoaded,
	getCountries,
	setCurrentPage,
	toogleAdition,
} from '../../redux/actions/actions.js';
import Input from '../Input/Input.jsx';
import Button from '../Button/Button.jsx';
import style from './Form.module.css';
import validate from '../../Utils/validate.js';
import SelectCountries from '../../pages/CreateActivity/components/SelectCountries/SelectCountries.jsx';
import ShowCountriesSelected from '../../pages/CreateActivity/components/ShowCountriesSelected/ShowCountriesSelected.jsx';
import ManualSearchCountries from '../../pages/CreateActivity/components/ManualSearchCountries/ManualSearchCountries.jsx';

function Form() {
	//estado global del formulario para el dispatch
	const [data, setData] = useState({ name: '', duration: '', difficulty: '', season: '', countryId: [] });

	//aca switcheo si es que un pais va a tener actividad o no
	const [added, setAdded] = useState({});

	//status para cuando se envia el form mostrar el envio exitoso al final del boton
	const [status, setStatus] = useState(false);

	const [sended, setSended] = useState(false);

	// errores de campo de formularios
	const [errors, setError] = useState({});

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCountries());

		return () => {
			dispatch(clearCountriesLoaded());
			dispatch(setCurrentPage(1));
		};
	}, [dispatch]);

	// para setear data si es que tenemos un pais nuevo para agregar a la actividad
	useEffect(() => {
		setData({ ...data, countryId: [...propsTrueToArr()] });

		// eslint-disable-next-line
	}, [added]);

	useEffect(() => {
		setError(validate(data));
	}, [data]);

	//limpiamos todos los campos una vez enviado el form
	const clearFields = (e) => {
		e.target[0].value = '';
		e.target[1].value = '';
		e.target[2].value = '';
		e.target[3].value = '';

		setAdded({});
	};

	//cargamos el estado de cada boton en un objeto para poder posteriormente cargarlo a un array de IDS
	function propsTrueToArr() {
		const arr1 = [];

		for (let key in added) {
			if (added[key]) {
				arr1.push(key);
			}
		}
		return arr1;
	}

	// despacho del formulario y ejecucion de limpieza de campos y estados
	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(addActivity(data));
		clearFields(e);
		setStatus(true);
		setError({
			difficulty: 'Este campo es requerido',
			duration: 'Este campo es requerido',
			name: 'Este campo es requerido',
			season: 'Este campo es requerido',
		});
		setData({ countryId: [] });
		setSearch({ buttonSearch: '' });

		setTimeout(() => {
			setStatus(false);
			setSended(true);
		}, 3000);
	};

	return (
		<div className={style.container}>
			<form className={style.form} onSubmit={onSubmit}>
				{/* aca estan los 4 inputs principales */}
				<div className={style.inputsContainer}>
					<Input
						label='Nombre'
						name='name'
						placeholder='Ingrese una actividad'
						className='secondary'
						state={data}
						setState={setData}
						error={errors}
						setError={setError}
					/>

					<Input
						label='Dificultad'
						name='difficulty'
						placeholder='Dificultad'
						className='secondary'
						type='text'
						state={data}
						setState={setData}
						error={errors}
						setError={setError}
					/>
					<Input
						label='Duración'
						name='duration'
						placeholder='Ingrese el tiempo en horas'
						className='secondary'
						state={data}
						setState={setData}
						error={errors}
						setError={setError}
					/>

					<Input
						label='Temporada'
						name='season'
						placeholder='Temporada'
						className='secondary'
						state={data}
						setState={setData}
						error={errors}
						setError={setError}
					/>
				</div>

				<ManualSearchCountries />

				<ShowCountriesSelected />

				<SelectCountries />

				{/* boton de envio del formulario */}
				{Object.keys(errors).length ? (
					<Button value='Agregar Actividad' disabled={true} type='submit' className='secondary' />
				) : (
					<Button value='Agregar Actividad' type='submit' className='secondary' />
				)}

				{/* estado del envio, el mismo tiene un setTimeout para ser mostrado solamente por 5s */}
				{status && (
					<div className={style.success}>
						<h5>El formulario fue enviado correctamente</h5>
					</div>
				)}

				{sended && <Redirect to='/home' />}
			</form>
		</div>
	);
}

export default Form;
