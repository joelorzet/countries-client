import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading/Loading';
import Pagination from '../../components/Pagination/Pagination';
import { usePagination } from '../../hooks/usePagination';
import { clearCountriesLoaded, getCountries } from '../../redux/actions/actions';
import {
	CountriesCards,
	FilterByActivity,
	FilterByContinent,
	SearchBar,
	SortByName,
	SortByPopulation,
} from './components';
import styles from './styles/Home.module.css';

const Home = () => {
	const dispatch = useDispatch();
	const activities = useSelector((state) => state.countriesLoaded.activities);
	const showActivitiesFilter = activities.length > 0 ? true : false;

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		dispatch(getCountries(setLoading));

		return () => {
			dispatch(clearCountriesLoaded());
		};
	}, [dispatch]);

	const { currentPosts, postPerPage, totalPosts, currentPage, setPostPerPage, setSort } = usePagination();

	return (
		<div className={styles.container}>
			{loading ? (
				<Loading />
			) : (
				<div className={styles.container}>
					<SearchBar />
					<FilterByContinent />
					<div className={styles.sort}>
						<SortByName sort={setSort} />
						<SortByPopulation sort={setSort} />

						{showActivitiesFilter && <FilterByActivity />}
					</div>
					<CountriesCards countries={currentPosts} />
					<Pagination
						postPerPage={postPerPage}
						totalPosts={totalPosts}
						currentPage={currentPage}
						setPostPerPage={setPostPerPage}
					/>
				</div>
			)}
		</div>
	);
};

export default Home;
