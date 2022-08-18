import validate from './validate.js';

export default function handlerInputChange(e, state, setData, setErrors) {
	setData({
		...state,
		[e.target.name]: e.target.value,
	});

	setErrors(
		validate({
			...state,
			[e.target.name]: e.target.value,
		})
	);
}
