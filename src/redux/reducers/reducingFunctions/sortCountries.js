const sorts = {
	SORT_A_TO_Z: (state, action) => ({
		...state,
		countriesLoaded: state.countriesLoaded
			.map((e) => e)
			.sort((a, b) => {
				return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
			}),
		countriesFiltered: state.countriesFiltered
			?.map((e) => e)
			?.sort((a, b) => {
				return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
			}),
		selectedSort: action.payload,
	}),
	SORT_Z_TO_A: (state, action) => ({
		...state,
		countriesLoaded: state.countriesLoaded
			.map((e) => e)
			.sort((a, b) => {
				return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
			}),
		countriesFiltered: state.countriesFiltered
			?.map((e) => e)
			?.sort((a, b) => {
				return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
			}),
		selectedSort: action.payload,
	}),
	SORT_BY_POPULATION_ASC: (state, action) => ({
		...state,
		countriesLoaded: state.countriesLoaded.map((e) => e).sort((a, b) => b.population - a.population),
		countriesFiltered: state.countriesFiltered?.map((e) => e)?.sort((a, b) => b.population - a.population),
		selectedSort: action.payload,
	}),
	SORT_BY_POPULATION_DES: (state, action) => ({
		...state,
		countriesLoaded: state.countriesLoaded.map((e) => e).sort((a, b) => a.population - b.population),
		countriesFiltered: state.countriesFiltered?.map((e) => e)?.sort((a, b) => a.population - b.population),
		selectedSort: action.payload,
	}),
};

export default function sortCountries(state, action) {
	return typeof sorts[action.payload] === 'function' ? sorts[action.payload](state, action) : state;
}
