import hasActivity from '../../../Utils/countrieHasActivity';

export default function filterByActivity(state, action) {
	const countrysToAdd = state.countriesLoaded?.forEach((e) => {
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
