import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	clearCountriesLoaded,
	orderAToZ,
	orderZToA,
	orderByPopulationAsc,
	orderByPopulationDes,
	getCountries,
	setCurrentPage,
	sortByActivity,
	defaultCountries,
	sortByContinent,
} from '../../actions/actions.js';
import Card from '../Card/Card.jsx';
import Pagination from '../Pagination/Pagination.jsx';
import Button from '../Button/Button.jsx';
import Input from '../Input/Input.jsx';
import Loading from '../Loading/Loading.jsx';
import style from './Home.module.css';

function Home() {
	const dispatch = useDispatch();

	//traemos los paises del store
	const cities = useSelector((state) => state.countriesLoaded);
	const filteredCountrys = useSelector((state) => state.countriesFiltered);
	const activities = useSelector((state) => state.activities);
	const pageNumber = useSelector((state) => state.currentPage);

	// esto es para mapear los botones de filtrado por actividad y por continente
	const activitiesNames = [...new Set(activities?.map((e) => e.name.toLowerCase()))];
	const continentNames = [
		...new Set(
			cities?.map((e) => e.continent).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
		),
	];

	//si es que hay actividades cargadas mostramos el div de filtraje por actividad
	const showActivitiesFilter = activitiesNames.length > 0 ? true : false;

	//estado del input para la busqueda
	const [data, setData] = useState({ search: '' });

	//aca decidimos si mostramos la busqueda o no
	const [search, setSearch] = useState(false);

	//definimos el resaltado de cada filtro con estos, lo hacemos con operadores logicos
	//se supone que cuando filtramos el boton deberia tener una manera de ser identificado
	// para que el usuario final identifique que es lo que esta viendo
	const [selectedFilter, setSelectedFilter] = useState('');
	const [selectedSort, setSelectedSort] = useState('');

	// su unica y hermosa funcion es mostrar el loading antes de que lleguen los paises de nuestro back
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		dispatch(getCountries(setLoading));

		return () => {
			dispatch(clearCountriesLoaded());
		};
	}, [dispatch]);

	//aca cargamos o una citi o un error para la busqueda manual
	const [citi, setCiti] = useState({});

	//estado para el error de la busqueda de citi
	const [error, setError] = useState(null);

	//si cambia el numero de pagina en el estado, lo cambiamos aca
	useEffect(() => {
		setPageNumber(pageNumber);
	}, [pageNumber]);

	//para el paginado
	const [currentPage, setPageNumber] = useState(pageNumber);

	//una suma booleana para ver si es que mostramos 9 páginas para la primer parte,
	//o mostramos 10 a partir de las siguientes páginas
	const itsFirstPage = currentPage !== 1 ? true : false;
	const [postPerPage, setPostPerPage] = useState(9 + itsFirstPage);

	// aca definimos cuantas paginas deberia tener el paginado
	const indexOfLastPost = currentPage * postPerPage;
	const indexOfFirstPost = indexOfLastPost - postPerPage;
	const totalPosts = filteredCountrys.length ? filteredCountrys.length : cities.length;

	// esto es para ver si es que tenemos paises filtrados
	let currentPosts = filteredCountrys.length
		? filteredCountrys.slice(indexOfFirstPost, indexOfLastPost)
		: cities.slice(indexOfFirstPost, indexOfLastPost);

	// para poder definir a que pagina ir cuando se hace click en un boton
	const paginate = (pageNumber) => {
		dispatch(setCurrentPage(pageNumber));
	};
	//  busqueda manual de ciudad
	const submitHandler = (e) => {
		e.preventDefault();
		searchCitie();
		e.target[0].value = '';
	};

	// traemos una card en particular en la busqueda manual si es que hay
	function searchCitie() {
		const country = cities.filter((e) => e.name.toLowerCase().includes(data.search.toLowerCase()));
		if (country.length) {
			setCiti({ country: country[0] });
			setSearch(true);
			setError(false);
		} else {
			setError(true);
			setSearch(false);
		}
	}

	// limpieza del input de busqueda manual
	const clearInput = () => {
		setError(null);
		setData({ search: '' });
		setCiti({});
		setSearch(false);
	};

	return (
		<div className={style.container}>
			{loading ? (
				<Loading />
			) : (
				<div className={style.container}>
					{/* busqueda manual vía input de pais */}
					<div>
						<form onSubmit={submitHandler}>
							<Input
								name='search'
								type='text'
								placeholder='Ciudad...'
								state={data}
								setState={setData}
								className='normal'
								label='Buscar'
							/>
							<div className={style.buttons}>
								<Button value='Limpiar' type='button' onClick={() => clearInput()} className='secondary' />
								<Button value='Buscar' type='submit' className='secondary' />
							</div>
						</form>
					</div>

					{/* acá estan todos los botons de ordenamiento y filtros */}

					<div className={style.boxButtons}>
						<p>Filtrar por continente</p>

						<div className={style.sortBtn}>
							{continentNames?.map((e) => (
								<Button
									value={e}
									type='button'
									onClick={() => {
										dispatch(sortByContinent(e));
										setSelectedFilter(e);
									}}
									className={(selectedFilter === e && 'selected') || 'btnLow'}
								/>
							))}
							<Button
								value='Deafult'
								type='button'
								onClick={() => {
									dispatch(defaultCountries());
									setSelectedFilter('default');
								}}
								className={(selectedFilter === 'default' && 'selected') || 'btnLow'}
							/>
						</div>
					</div>
					<div className={style.containerSort}>
						<div className={style.boxButtons}>
							<p>Ordenar alfabeticamente</p>
							<div className={style.sortBtn}>
								<Button
									value='A-Z'
									type='button'
									onClick={() => {
										dispatch(orderAToZ());
										setSelectedSort('az');
									}}
									className={(selectedSort === 'az' && 'selected') || 'btnLow'}
								/>
								<Button
									value='Z-A'
									type='button'
									onClick={() => {
										dispatch(orderZToA());
										setSelectedSort('za');
									}}
									className={(selectedSort === 'za' && 'selected') || 'btnLow'}
								/>
							</div>
						</div>
						<div className={style.boxButtons}>
							<p>Ordenar por cantidad de población</p>
							<div className={style.sortBtn}>
								<Button
									value='May-Men'
									type='button'
									onClick={() => {
										dispatch(orderByPopulationAsc());
										setSelectedSort('mayor');
									}}
									className={(selectedSort === 'mayor' && 'selected') || 'btnLow'}
								/>
								<Button
									value='Men-May'
									type='button'
									onClick={() => {
										dispatch(orderByPopulationDes());
										setSelectedSort('menor');
									}}
									className={(selectedSort === 'menor' && 'selected') || 'btnLow'}
								/>
							</div>
						</div>

						{showActivitiesFilter && (
							<div className={style.boxButtons}>
								<p>Filtrar por Actividad</p>

								<div className={style.sortBtn}>
									{activitiesNames?.map((e) => (
										<Button
											value={e}
											key={e}
											onClick={() => {
												dispatch(sortByActivity(e));
												setSelectedFilter(e);
											}}
											className={(selectedFilter === e && 'selected') || 'btnLow'}
										/>
									))}
								</div>
							</div>
						)}
					</div>

					{/* aca mostramos la ciudad si es que la encontramos y si no tenemos un error preseteado */}
					<div className={style.searchResult}>
						{search && !error && (
							<Card
								name={citi?.country.name}
								continent={citi?.country.continent}
								flag={citi?.country.image}
								key={citi?.country.id}
								id={citi?.country.id}
							/>
						)}
						{error === true && <h4>No se encontro la ciudad solicitada</h4>}
					</div>

					{/* mapeamos las ciudades para mostrar en esta pagina y abajo la paginacion para poder ir cambiando de lugar */}
					<div className={style.cards}>
						{currentPosts?.map((citi) => (
							<Card
								name={citi.name}
								continent={citi.continent}
								flag={citi.image}
								key={citi.id}
								id={citi.id}
							/>
						))}
					</div>

					<Pagination
						postPerPage={postPerPage}
						totalPosts={totalPosts}
						currentPage={currentPage}
						setPostPerPage={setPostPerPage}
						paginate={paginate}
						setCurrentPage={setCurrentPage}
					/>
				</div>
			)}
		</div>
	);
}

export default Home;