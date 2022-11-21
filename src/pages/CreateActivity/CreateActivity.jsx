import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addActivity, clearCountriesLoaded, getCountries, setCurrentPage } from '../../redux/actions/actions';
import { filterIDS } from '../../Utils/filterIDS';
import validate from '../../Utils/validate';
import { ManualSearchCountries, SelectCountries, ShowCountriesSelected } from './components';
import { ERRORS, initialData } from './utils/initialData';
import style from './styles/CreateActivity.module.css';
import { Button, Input } from '../../components';
import { Redirect } from 'react-router-dom';

function CreateActivity() {
	//estado global del formulario para el dispatch
	const [data, setData] = useState(initialData);

	const { countriesAdded } = useSelector((state) => state.formReducer);

	//status para cuando se envia el form mostrar el envio exitoso al final del boton
	const [status, setStatus] = useState(false);

	const [sended, setSended] = useState(false);

	// errores de campo de formularios
	const [errors, setError] = useState(ERRORS);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCountries());

		return () => {
			dispatch(clearCountriesLoaded());
			dispatch(setCurrentPage(1));
		};
	}, [dispatch]);

	useEffect(() => {
		setData({ ...data, countryId: [...filterIDS(countriesAdded)] });
	}, [countriesAdded]);

	useEffect(() => {
		setError(validate(data));
	}, [data]);

	//limpiamos todos los campos una vez enviado el form
	const clearFields = (e) => {
		e.target[0].value = '';
		e.target[1].value = '';
		e.target[2].value = '';
		e.target[3].value = '';
	};

	// despacho del formulario y ejecucion de limpieza de campos y estados
	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(addActivity(data));
		clearFields(e);
		setStatus(true);
		setError(ERRORS);
		setData({ countryId: [] });

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
			</form>
			{/* estado del envio, el mismo tiene un setTimeout para ser mostrado solamente por 5s */}
			{status && (
				<div className={style.success}>
					<h5>El formulario fue enviado correctamente</h5>
				</div>
			)}

			{sended && <Redirect to='/home' />}
		</div>
	);
}

export default CreateActivity;
