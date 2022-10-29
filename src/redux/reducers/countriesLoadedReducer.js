import {
	GET_COUNTRIES,
	SORT_A_TO_Z,
	SORT_Z_TO_A,
	SORT_BY_POPULATION_ASC,
	SORT_BY_POPULATION_DES,
	FILTER_BY_ACTIVITY,
	GET_COUNTRIES_BY_QUERY,
	FILTER_BY_CONTINENT,
	CLEAR_COUNTRY_DETAIL,
	CLEAR_COUNTRIES_LOADED,
	DEFAULT,
} from '../actions/actions.js';

import getCountriesReduced from './reducingFunctions/getCountries.js';
import { filterByActivity, filterByContintent } from './reducingFunctions/filterCountries.js';
import sortCountries from './reducingFunctions/sortCountries.js';

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

		case SORT_A_TO_Z:
			return sortCountries(state, SORT_A_TO_Z);

		case SORT_Z_TO_A:
			return sortCountries(state, SORT_Z_TO_A);

		case SORT_BY_POPULATION_ASC:
			return sortCountries(state, SORT_BY_POPULATION_ASC);

		case SORT_BY_POPULATION_DES:
			return sortCountries(state, SORT_BY_POPULATION_DES);

		case FILTER_BY_CONTINENT:
			return filterByContintent(state, action);

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
