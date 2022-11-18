const filterFunction = {
	FILTER_BY_CONTINENT: (state, action) => ({
		...state,
		countriesFiltered: state.countriesLoaded.filter((e) => e.continent === action.payload),
		selectedFilter: action.payload,
	}),
	FILTER_BY_ACTIVITY: (state, action) => {
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
			selectedFilter: action.payload,
		};
	},
};

export default function filterContinents(state, action) {
	return typeof filterFunction[action.type] === 'function'
		? filterFunction[action.type](state, action)
		: state;
}
