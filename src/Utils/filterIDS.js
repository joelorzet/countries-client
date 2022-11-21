export function filterIDS(added) {
	const arr1 = [];

	for (let key in added) {
		if (added[key]) {
			arr1.push(key);
		}
	}
	return arr1;
}
