import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCountrieDetail, deleteActivity, clearCountrieDetail } from '../../redux/actions/actions.js';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../Button/Button.jsx';
import Loading from '../Loading/Loading.jsx';
import capitalize from '../../Utils/capitalize.js';
import style from './CountrieDetail.module.css';

function CountrieDetail() {
	const { idPais } = useParams();

	const dispatch = useDispatch();
	const [countrieDetail, setCountrieDetail] = useState({});
	const [table, setTable] = useState([]);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		dispatch(getCountrieDetail(idPais, setLoading));

		return () => {
			dispatch(clearCountrieDetail());
		};
	}, [dispatch, idPais]);

	const { countrie } = useSelector((e) => e.countrieDetail);

	useEffect(() => {
		setCountrieDetail(countrie);
	}, [countrieDetail, countrie]);

	const hasActivities = countrieDetail.Actividad_Turisticas?.length ? true : false;

	return (
		<div className={style.container}>
			{loading ? (
				<Loading />
			) : (
				<div className={style.box}>
					<div className={style.content}>
						<h4>
							Bienvenidos al detalle de: <b>{countrie.name}</b>
						</h4>
						<div>
							<img className={style.img} src={countrie.image} alt='countrieFlag' />
						</div>

						<div className={style.data}>
							<div>
								<div className={style.principal}>
									<p>
										País: <b>{countrie.name}</b>
									</p>
									<p>
										Continente: <b>{countrie.continent}</b>
									</p>
									<p>
										Subregión: <b>{countrie.subRegion}</b>
									</p>
									<p>
										Capital: <b>{countrie.capital}</b>
									</p>
								</div>

								<p>
									Área: <b>{(countrie.area / 1000000).toFixed(2)}</b> millones de km<sup>2</sup>
								</p>
								<p>
									Población: <b>{countrie.population}</b>
								</p>
							</div>
							{hasActivities ? (
								<table>
									<thead>
										<tr>
											<th>Actividad</th>
											<th>Duración</th>
											<th>Dificultad</th>
											<th>Temporada</th>
											<th>Eliminar</th>
										</tr>
									</thead>
									{countrieDetail.Actividad_Turisticas?.map((e) => {
										return (
											<tbody key={e.id} id={e.id}>
												<tr>
													<td>{capitalize(e.name)}</td>
													<td>
														<b>{e.duration}</b> horas
													</td>
													<td>
														<b>{e.difficulty}</b>
													</td>
													<td>{capitalize(e.season)}</td>
													<td>
														<Button
															value='Delete'
															onClick={() => {
																dispatch(deleteActivity({ countryId: idPais, activityId: e.id }));
																setTable(table?.filter((el) => el.id !== e.id));
																setTimeout(() => {
																	dispatch(getCountrieDetail(idPais));
																}, 400);
															}}
															className='btnLow'
														/>
													</td>
												</tr>
											</tbody>
										);
									})}
								</table>
							) : (
								<p>Este país no tiene actividades todavía</p>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default CountrieDetail;
