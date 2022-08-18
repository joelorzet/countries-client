import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addActivity, clearCountriesLoaded, getCountries, setCurrentPage } from '../../actions/actions.js';
import Input from '../Input/Input.jsx';
import Button from '../Button/Button.jsx';
import style from './Form.module.css';
import validate from '../../Utils/validate.js';

function Form() {
	//estado global del formulario para el dispatch
	const [data, setData] = useState({ name: '', duration: '', difficulty: '', season: '', countryId: [] });

	//aca switcheo si es que un pais va a tener actividad o no
	const [added, setAdded] = useState({});

	//status para cuando se envia el form mostrar el envio exitoso al final del boton
	const [status, setStatus] = useState(false);

	// busqueda manual de paises en input
	const [search, setSearch] = useState({});

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

	// traemos los paises del store para mapear botones y agregar actividades a cada ciudad
	const countries = useSelector((e) =>
		e.countriesLoaded
			.map((e) => {
				return { name: e.name, id: e.id };
			})
			.sort((a, b) => {
				return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
			})
	);

	//mostramos ciudades agregadas
	const showButtonsCities = Object.keys(search).length > 0 ? true : false;
	const showContainerCities = search?.buttonSearch?.length > 0 ? true : false;

	// cambiamos el estado de cada boton para saber si es que al final se agregan o no al estado global
	const switchAddition = (id) => {
		setAdded({
			...added,
			[id]: !added[id],
		});
	};

	// para setear data si es que tenemos un pais nuevo para agregar a la actividad
	useEffect(() => {
		setData({ ...data, countryId: [...propsTrueToArr()] });

		// eslint-disable-next-line
	}, [added]);

	//ademas de validar los inputs, verificamos que al menos haya 1 país agregado...
	//seria como una segunda validacion para estar seguros de que no se mande con faltante de informacion

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
		<div>
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

				{/* busqueda manual */}
				<div>
					{/* aca estan mapeados los paises que se agregaron, tambien cuentan con las funciones de 
					de agregar pais, o para ser retirados de ahi mismo */}

					<Input
						label='Buscar manualmente'
						name='buttonSearch'
						placeholder='Ingrese su búsqueda'
						className='secondary'
						state={search}
						setState={setSearch}
					/>

					{showContainerCities && (
						<div className={style.btnSearch}>
							{showButtonsCities &&
								countries
									.filter((e) => e.name.toLowerCase().includes(search.buttonSearch.toLowerCase()))
									.map((e) => (
										<Button
											value={e.name}
											key={e.id}
											onClick={() => {
												switchAddition(e.id);
												setSearch({});
											}}
											type='button'
											className={(added[e.id] && 'selected') || 'btnLow'}
										/>
									))}
						</div>
					)}

					{/* aca estan los paises seleccionados que van a tener la actividad 
					todos cuentan con la funcinoalidad de ser seleccionados y desseleccionarse */}
					<h3 className={style.h3}>Su elección</h3>

					<div className={style.buttonsToShow}>
						{countries
							.filter((e) => data?.countryId?.includes(e.id))
							.map((e) => (
								<Button
									value={e.name}
									key={e.id}
									onClick={() => {
										switchAddition(e.id);
										setSearch({});
									}}
									type='button'
									className={(added[e.id] && 'selected') || 'btnLow'}
								/>
							))}
					</div>
				</div>

				{/* aca mapeo todos los botones de los paises para que se agreguen al estado */}
				<div className={style.countries}>
					{countries?.map((e) => (
						<Button
							value={e.name}
							key={e.id}
							onClick={() => {
								switchAddition(e.id);
								setSearch({});
							}}
							type='button'
							className={(added[e.id] && 'selected') || 'btnLow'}
						/>
					))}
				</div>

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
