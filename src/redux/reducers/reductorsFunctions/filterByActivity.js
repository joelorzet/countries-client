export default function filterByActivity(state, action) {
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
}
