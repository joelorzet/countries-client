export default function hasActivity(arr, activity, country) {
	if (arr.length > 0) {
		arr.forEach((e) => {
			if (e.name.toLowerCase() === activity.toLowerCase()) {
				countrysToAdd.push(country);
			}
		});
	}
}
