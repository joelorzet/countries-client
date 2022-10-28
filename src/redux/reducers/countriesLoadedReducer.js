import {
	GET_COUNTRIES,
	ORDER_A_TO_Z,
	ORDER_Z_TO_A,
	ORDER_BY_POPULATION_ASC,
	ORDER_BY_POPULATION_DES,
	FILTER_BY_ACTIVITY,
	GET_COUNTRIES_BY_QUERY,
	SORT_BY_CONTINENT,
	CLEAR_COUNTRY_DETAIL,
	CLEAR_COUNTRIES_LOADED,
	DEFAULT,
} from '../actions/actions.js';

import getCountriesReduced from './reductorsFunctions/getCountries.js';
import filterByActivity from './reductorsFunctions/filterByActivity.js';

const initialState = {
	countriesLoaded: [],
	countriesFiltered: [],
	activities: [],
};

export default function countriesLoadedReducer(state = initialState, action) {
	switch (action.type) {
		case GET_COUNTRIES:
			return getCountriesReduced(state, action);

		case CLEAR_COUNTRY_DETAIL:
			return { ...state, countrieDetail: {} };

		case CLEAR_COUNTRIES_LOADED:
			return { ...state, countriesLoaded: [], countriesFiltered: [] };

		case GET_COUNTRIES_BY_QUERY:
			return { ...state, countriesFiltered: [...action.payload] };

		case ORDER_A_TO_Z:
			return {
				...state,
				countriesLoaded: state.countriesLoaded.sort((a, b) => {
					return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
				}),
				countriesFiltered: state.countriesFiltered?.sort((a, b) => {
					return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
				}),
			};

		case ORDER_Z_TO_A:
			return {
				...state,
				countriesLoaded: state.countriesLoaded.sort((a, b) => {
					return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
				}),
				countriesFiltered: state.countriesFiltered?.sort((a, b) => {
					return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
				}),
			};

		case ORDER_BY_POPULATION_ASC:
			return {
				...state,
				countriesLoaded: state.countriesLoaded.sort((a, b) => b.population - a.population),
				countriesFiltered: state.countriesFiltered?.sort((a, b) => b.population - a.population),
			};

		case ORDER_BY_POPULATION_DES:
			return {
				...state,
				countriesLoaded: state.countriesLoaded.sort((a, b) => a.population - b.population),
				countriesFiltered: state.countriesFiltered?.sort((a, b) => a.population - b.population),
			};

		case SORT_BY_CONTINENT:
			return {
				...state,
				countriesFiltered: state.countriesLoaded.filter((e) => e.continent === action.payload),
			};

		case FILTER_BY_ACTIVITY:
			return filterByActivity(state, action);

		case DEFAULT:
			return {
				...state,
				countriesFiltered: [],
			};

		default:
			return state;
	}
}
