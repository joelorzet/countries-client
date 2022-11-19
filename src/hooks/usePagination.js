import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export function usePagination() {
	const pageNumber = useSelector((state) => state.pagination.currentPage);
	const { countriesLoaded, countriesFiltered } = useSelector((state) => state.countriesLoaded);

	//para el paginado
	const [currentPage, setPageNumber] = useState(pageNumber);
	const [sort, setSort] = useState('');

	//si cambia el numero de pagina en el estado, lo cambiamos aca
	useEffect(() => {
		setPageNumber(pageNumber);
	}, [pageNumber]);
	//una suma booleana para ver si es que mostramos 9 páginas para la primer parte,
	//o mostramos 10 a partir de las siguientes páginas
	const itsFirstPage = currentPage !== 1 ? true : false;
	const [postPerPage, setPostPerPage] = useState(9 + itsFirstPage);

	// aca definimos cuantas paginas deberia tener el paginado
	const indexOfLastPost = currentPage * postPerPage;
	const indexOfFirstPost = indexOfLastPost - postPerPage;
	const totalPosts = countriesFiltered.length ? countriesFiltered.length : countriesLoaded.length;

	const setPosts = () => {
		return countriesFiltered.length
			? countriesFiltered.slice(indexOfFirstPost, indexOfLastPost)
			: countriesLoaded.slice(indexOfFirstPost, indexOfLastPost);
	};

	const [currentPosts, setCurrentPosts] = useState(setPosts());

	useEffect(() => {
		setCurrentPosts(setPosts());
	}, [countriesLoaded, countriesFiltered, sort, pageNumber, setCurrentPosts]);

	return { currentPosts, postPerPage, totalPosts, currentPage, setPostPerPage, setSort, setPageNumber };
}
