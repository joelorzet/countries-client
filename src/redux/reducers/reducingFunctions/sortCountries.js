const sorts = {
	SORT_A_TO_Z: (state) => ({
		...state,
		countriesLoaded: state.countriesLoaded.sort((a, b) => {
			return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
		}),
		countriesFiltered: state.countriesFiltered?.sort((a, b) => {
			return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
		}),
	}),
	SORT_Z_TO_A: (state) => ({
		...state,
		countriesLoaded: state.countriesLoaded.sort((a, b) => {
			return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
		}),
		countriesFiltered: state.countriesFiltered?.sort((a, b) => {
			return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
		}),
	}),
	SORT_BY_POPULATION_ASC: (state) => ({
		...state,
		countriesLoaded: state.countriesLoaded.sort((a, b) => b.population - a.population),
		countriesFiltered: state.countriesFiltered?.sort((a, b) => b.population - a.population),
	}),
	SORT_BY_POPULATION_DES: (state) => ({
		...state,
		countriesLoaded: state.countriesLoaded.sort((a, b) => a.population - b.population),
		countriesFiltered: state.countriesFiltered?.sort((a, b) => a.population - b.population),
	}),
};

export default function sortCountries(state, action) {
	return typeof sorts[action.payload] === 'function' ? sorts[action.payload](state) : state;
}
