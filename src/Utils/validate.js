export default function validate(input) {
	let errors = {
		difficulty: 'Este campo es requerido',
		duration: 'Este campo es requerido',
		name: 'Este campo es requerido',
		season: 'Este campo es requerido',
	};

	const seasons = ['verano', 'invierno', 'primavera', 'otoño'];

	if (!input.name) {
		errors.name = 'Este campo es requerido';
	} else {
		delete errors.name;
	}

	if (!input.difficulty) {
		errors.difficulty = 'Este campo es requerido';
	} else if (Number(input.difficulty) <= 0) {
		errors.difficulty = 'El valor ingresado debe ser de 1 a 5';
	} else if (Number(input.difficulty) >= 6) {
		errors.difficulty = 'El valor ingresado debe ser de 1 a 5';
	} else if (!Number(input.difficulty)) {
		errors.difficulty = 'Debe ingresar un número válido';
	} else {
		delete errors.difficulty;
	}

	if (!input.duration) {
		errors.duration = 'Este campo es requerido';
	} else if (Number(input.duration) >= 24) {
		errors.duration = 'Ingrese una actividad de duración menor a 1 día';
	} else if (Number(input.duration) <= 0) {
		errors.duration = 'La actividad tener al menos 1 hora de duración';
	} else if (!Number(input.duration)) {
		errors.duration = 'Debe ingresar un número válido';
	} else {
		delete errors.duration;
	}

	if (!input.season) {
		errors.season = 'Este campo es requerido';
	} else if (!seasons.includes(input.season.toLowerCase())) {
		errors.season = 'Ingrese Invierno, Otoño, Primavera o Verano';
	} else {
		delete errors.season;
	}

	if (input.countryId.length < 1) {
		errors.countryId = 'Debe tener al menos un país agregado';
	} else {
		delete errors.countryId;
	}

	return errors;
}
