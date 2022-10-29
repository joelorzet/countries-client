export default function getCountriesReduced(state, action) {
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
}
