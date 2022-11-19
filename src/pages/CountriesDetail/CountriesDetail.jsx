import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './styles/CountriesDetail.module.css';
import { ActivityTable, Header, CountrieData } from './components';
import { clearCountrieDetail, getCountrieDetail } from '../../redux/actions/actions.js';
import { Loading } from '../../components/index.js';

function CountrieDetail() {
	const { idPais } = useParams();

	const dispatch = useDispatch();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		dispatch(getCountrieDetail(idPais, setLoading));

		return () => {
			dispatch(clearCountrieDetail());
		};
	}, [dispatch, idPais]);

	return (
		<div className={styles.container}>
			{loading ? (
				<Loading />
			) : (
				<div className={styles.box}>
					<div className={styles.content}>
						<Header />

						<div className={styles.data}>
							<CountrieData />
							<ActivityTable idPais={idPais} />
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default CountrieDetail;
