import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Loading, Pagination } from '../../components';
import { usePagination } from '../../hooks/usePagination';
import { clearCountriesLoaded, getCountries } from '../../redux/actions/actions';
import { CountriesCards, FilterByContinent, SearchBar } from './components';
import { Sorts } from './components/Sorts';
import styles from './styles/Home.module.css';

const Home = () => {
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		dispatch(getCountries(setLoading));

		return () => {
			dispatch(clearCountriesLoaded());
		};
	}, [dispatch]);

	const { postPerPage, totalPosts, currentPage, setPostPerPage, setPageNumber } = usePagination();

	return (
		<div className={styles.container}>
			{loading ? (
				<Loading />
			) : (
				<div className={styles.container}>
					<SearchBar />
					<FilterByContinent />
					<Sorts />
					<CountriesCards />
					<Pagination
						postPerPage={postPerPage}
						totalPosts={totalPosts}
						currentPage={currentPage}
						setPostPerPage={setPostPerPage}
						setPageNumber={setPageNumber}
					/>
				</div>
			)}
		</div>
	);
};

export default Home;
