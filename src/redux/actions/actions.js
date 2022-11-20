import axios from 'axios';

export const ADD_ACTIVITY = 'ADD_ACTIVITY';
export const CLEAR_COUNTRIES_LOADED = 'CLEAR_COUNTRIES_LOADED';
export const CLEAR_COUNTRY_DETAIL = 'CLEAR_COUNTRY_DETAIL';
export const DEFAULT = 'DEFAULT';
export const DELETE_ACTIVITY = 'DELETE_ACTIVITY';
export const FILTER_BY_ACTIVITY = 'FILTER_BY_ACTIVITY';
export const FILTER_BY_CONTINENT = 'FILTER_BY_CONTINENT';
export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_COUNTRIE_DETAIL = 'GET_COUNTRIE_DETAIL';
export const GET_COUNTRIES_BY_QUERY = 'GET_COUNTRIES_BY_QUERY';
export const SORT_A_TO_Z = 'SORT_A_TO_Z';
export const SORT_Z_TO_A = 'SORT_Z_TO_A';
export const SORT_BY_POPULATION_ASC = 'SORT_BY_POPULATION_ASC';
export const SORT_BY_POPULATION_DES = 'SORT_BY_POPULATION_DES';
export const SORT_COUNTRIES = 'SORT_COUNTRIES';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const TOOGLE_ADDITION = 'TOOGLE_ADDITION';

// const API = 'https://countries-app-joel.herokuapp.com';
const API = 'http://localhost:3001';

//configurar objeto para hacer un put con los datos del form
//cambiamos a axios para no renegar tanto

export function addActivity(data) {
	return async function (dispatch) {
		try {
			// eslint-disable-next-line
			await axios.post(`${API}/activities`, data);
		} catch (err) {
			console.error(err);
		}
	};
}

export function getCountries(setLoading) {
	return async function (dispatch) {
		try {
			const { data } = await axios.get(`${API}/countries`);
			if (setLoading) setLoading(false);

			dispatch({ type: GET_COUNTRIES, payload: data });
		} catch (err) {
			console.error(err);
		}
	};
}

export function getCountrieDetail(id, setLoading) {
	return async function (dispatch) {
		try {
			const { data } = await axios.get(`${API}/countries/${id.toUpperCase()}`);

			if (setLoading) setLoading(false);

			dispatch({ type: GET_COUNTRIE_DETAIL, payload: data[0] });
		} catch (err) {
			console.error(err);
		}
	};
}

export function getCountriesBySearch(query) {
	return async function (dispatch) {
		try {
			const { data } = await axios.get(`${API}/countries?name=${query}`);

			dispatch({ type: GET_COUNTRIES_BY_QUERY, payload: data });
		} catch (err) {
			console.error(err);
		}
	};
}

export function deleteActivity(country) {
	return async function (dispatch) {
		try {
			const { data } = await axios.delete(
				`${API}/activities?countryId=${country.countryId}&activityId=${country.activityId}`
			);

			dispatch({ type: DELETE_ACTIVITY, payload: data });
		} catch (err) {
			console.error(err);
		}
	};
}

export function setCurrentPage(page) {
	return function (dispatch) {
		dispatch({ type: SET_CURRENT_PAGE, payload: page });
	};
}

export function clearCountrieDetail() {
	return function (dispatch) {
		return dispatch({ type: CLEAR_COUNTRY_DETAIL });
	};
}

export function clearCountriesLoaded() {
	return function (dispatch) {
		return dispatch({ type: CLEAR_COUNTRIES_LOADED });
	};
}

export function sortCountries(payload) {
	return function (dispatch) {
		return dispatch({ type: SORT_COUNTRIES, payload });
	};
}

export function filterByContinent(continent) {
	return function (dispatch) {
		return dispatch({ type: FILTER_BY_CONTINENT, payload: continent });
	};
}

export function filterByActivity(activity) {
	return function (dispatch) {
		return dispatch({ type: FILTER_BY_ACTIVITY, payload: activity });
	};
}

export function defaultCountries(payload) {
	return function (dispatch) {
		return dispatch({ type: DEFAULT, payload });
	};
}

export function toogleAdition(payload) {
	return function (dispatch) {
		return dispatch({ type: TOOGLE_ADDITION, payload });
	};
}
