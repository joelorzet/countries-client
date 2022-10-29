import getCountriesReduced from './reducingFunctions/getCountries.js';
import filterContinents from './reducingFunctions/filterCountries.js';
import sortCountries from './reducingFunctions/sortCountries.js';

const initialState = {
	countriesLoaded: [],
	countriesFiltered: [],
	activities: [],
};

const reducerController = {
	GET_COUNTRIES: (state, action) => getCountriesReduced(state, action),
	CLEAR_COUNTRY_DETAIL: (state) => ({ ...state, countrieDetail: {} }),
	CLEAR_COUNTRIES_LOADED: (state) => ({ ...state, countriesLoaded: [], countriesFiltered: [] }),
	GET_COUNTRIES_BY_QUERY: (state, action) => ({ ...state, countriesFiltered: [...action.payload] }),
	SORT_COUNTRIES: (state, action) => sortCountries(state, action),
	FILTER_BY_CONTINENT: (state, action) => filterContinents(state, action),
	FILTER_BY_ACTIVITY: (state, action) => filterContinents(state, action),
	DEFAULT: (state) => ({
		...state,
		countriesFiltered: [],
	}),
};

export default function countriesLoadedReducer(state = initialState, action) {
	return typeof reducerController[action.type] === 'function'
		? reducerController[action.type](state, action)
		: state;
}
