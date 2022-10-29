import {
	GET_COUNTRIES,
	SORT_COUNTRIES,
	FILTER_BY_ACTIVITY,
	GET_COUNTRIES_BY_QUERY,
	FILTER_BY_CONTINENT,
	CLEAR_COUNTRY_DETAIL,
	CLEAR_COUNTRIES_LOADED,
	DEFAULT,
} from '../actions/actions.js';

import getCountriesReduced from './reducingFunctions/getCountries.js';
import filterContinents from './reducingFunctions/filterCountries.js';
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

		case SORT_COUNTRIES:
			return sortCountries(state, action.payload);

		case FILTER_BY_CONTINENT:
			return filterContinents(state, action);

		case FILTER_BY_ACTIVITY:
			return filterContinents(state, action);

		case DEFAULT:
			return {
				...state,
				countriesFiltered: [],
			};

		default:
			return state;
	}
}
