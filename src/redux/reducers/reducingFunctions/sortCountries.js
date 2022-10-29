import {
	SORT_A_TO_Z,
	SORT_BY_POPULATION_ASC,
	SORT_BY_POPULATION_DES,
	SORT_Z_TO_A,
} from '../../actions/actions.js';

export default function sortCountries(state, caseType) {
	switch (caseType) {
		case SORT_A_TO_Z:
			return {
				...state,
				countriesLoaded: state.countriesLoaded.sort((a, b) => {
					return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
				}),
				countriesFiltered: state.countriesFiltered?.sort((a, b) => {
					return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
				}),
			};

		case SORT_Z_TO_A:
			return {
				...state,
				countriesLoaded: state.countriesLoaded.sort((a, b) => {
					return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
				}),
				countriesFiltered: state.countriesFiltered?.sort((a, b) => {
					return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
				}),
			};

		case SORT_BY_POPULATION_ASC:
			return {
				...state,
				countriesLoaded: state.countriesLoaded.sort((a, b) => b.population - a.population),
				countriesFiltered: state.countriesFiltered?.sort((a, b) => b.population - a.population),
			};

		case SORT_BY_POPULATION_DES:
			return {
				...state,
				countriesLoaded: state.countriesLoaded.sort((a, b) => a.population - b.population),
				countriesFiltered: state.countriesFiltered?.sort((a, b) => a.population - b.population),
			};
		default:
			return state;
	}
}
