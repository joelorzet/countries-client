import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../../components/Button/Button';
import { deleteActivity, getCountrieDetail } from '../../../../redux/actions/actions';
import capitalize from '../../../../Utils/capitalize';
import styles from './styles/ActivityTable.module.css';

const ActivityTable = ({ idPais }) => {
	const [table, setTable] = useState([]);
	const dispatch = useDispatch();

	const { countrie } = useSelector((e) => e.countrieDetail);

	const hasActivities = countrie.Actividad_Turisticas?.length ? true : false;

	return (
		<div>
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
					{countrie?.Actividad_Turisticas?.map((e) => {
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
	);
};

export default ActivityTable;
