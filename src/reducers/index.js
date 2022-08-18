import {
	GET_COUNTRIES,
	GET_COUNTRIE_DETAIL,
	ORDER_A_TO_Z,
	ORDER_Z_TO_A,
	ORDER_BY_POPULATION_ASC,
	ORDER_BY_POPULATION_DES,
	FILTER_BY_ACTIVITY,
	SORT_BY_CONTINENT,
	CLEAR_COUNTRY_DETAIL,
	CLEAR_COUNTRIES_LOADED,
	SET_CURRENT_PAGE,
	DEFAULT,
} from '../actions/actions.js';

const initialState = {
	countriesLoaded: [],
	countrieDetail: {},
	countriesFiltered: [],
	currentPage: 1,
	activities: [],
};

export default function rootReducer(state = initialState, action) {
	switch (action.type) {
		case GET_COUNTRIES:
			const activitiesArray = [];

			const activities = action.payload?.map((country) => {
				return country.Actividad_Turisticas?.map((e) => e);
			});
			activities?.forEach((e) => {
				if (e.length > 0) {
					e?.forEach((e) => activitiesArray.push(e));
				}
			});

			return {
				...state,
				countriesLoaded: action.payload,
				activities: [...activitiesArray],
			};

		case GET_COUNTRIE_DETAIL:
			return { ...state, countrieDetail: action.payload };

		case CLEAR_COUNTRY_DETAIL:
			return { ...state, countrieDetail: {} };

		case CLEAR_COUNTRIES_LOADED:
			return { ...state, countriesLoaded: [], countriesFiltered: [] };

		case SET_CURRENT_PAGE:
			return { ...state, currentPage: action.payload };

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
			const countrysToAdd = [];

			function hasActivity(arr, activity, country) {
				if (arr.length > 0) {
					arr.forEach((e) => {
						if (e.name.toLowerCase() === activity.toLowerCase()) {
							countrysToAdd.push(country);
						}
					});
				}
			}
			state.countriesLoaded?.forEach((e) => {
				if (e.Actividad_Turisticas.length > 0) {
					hasActivity(e.Actividad_Turisticas, action.payload.toLowerCase(), e);
				}
			});
			const add = [...new Set(countrysToAdd)];

			return {
				...state,
				countriesFiltered: add,
			};

		case DEFAULT:
			return {
				...state,
				countriesFiltered: [],
			};

		default:
			return state;
	}
}
