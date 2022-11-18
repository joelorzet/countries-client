import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export function usePagination() {
	const pageNumber = useSelector((state) => state.pagination.currentPage);
	const cities = useSelector((state) => state.countriesLoaded.countriesLoaded);
	const filteredCountrys = useSelector((state) => state.countriesLoaded.countriesFiltered);

	//si cambia el numero de pagina en el estado, lo cambiamos aca
	useEffect(() => {
		setPageNumber(pageNumber);
	}, [pageNumber]);

	//para el paginado
	const [currentPage, setPageNumber] = useState(pageNumber);
	const [sort, setSort] = useState('');

	//una suma booleana para ver si es que mostramos 9 páginas para la primer parte,
	//o mostramos 10 a partir de las siguientes páginas
	const itsFirstPage = currentPage !== 1 ? true : false;
	const [postPerPage, setPostPerPage] = useState(9 + itsFirstPage);

	// aca definimos cuantas paginas deberia tener el paginado
	const indexOfLastPost = currentPage * postPerPage;
	const indexOfFirstPost = indexOfLastPost - postPerPage;
	const totalPosts = filteredCountrys.length ? filteredCountrys.length : cities.length;

	const setPosts = () => {
		return filteredCountrys.length
			? filteredCountrys.slice(indexOfFirstPost, indexOfLastPost)
			: cities.slice(indexOfFirstPost, indexOfLastPost);
	};

	let posts = setPosts();
	useEffect(() => {
		setCurrentPosts(setPosts());
	}, [cities, filteredCountrys, sort, pageNumber]);

	const [currentPosts, setCurrentPosts] = useState(posts);

	return { currentPosts, postPerPage, totalPosts, currentPage, setPostPerPage, setSort };
}
