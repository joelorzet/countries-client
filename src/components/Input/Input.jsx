import React from 'react';
import validate from '../../Utils/validate.js';
import style from './Input.module.css';

function Input({
	state = {},
	setState,
	error = {},
	setError,
	placeholder,
	type,
	className = 'primary',
	name = 'Input',
	id,
	label,
}) {
	const onChange = (e) => {
		setState({ ...state, [name]: e.target.value });

		if (error && setError) {
			setError(
				validate({
					...state,
					[name]: e.target.value,
				})
			);
		}
	};
	const capitalize = (s) => {
		return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
	};

	return (
		<div className={style.inputBox}>
			{label && <label className={style.label}>{capitalize(label)}</label>}
			<input
				className={style[className]}
				name={name}
				id={id}
				placeholder={placeholder ? placeholder : 'Ingrese un valor'}
				type={type ? type : 'text'}
				onChange={onChange}
			/>
			{error[name] && <p className={style.error}>{error[name]}</p>}
		</div>
	);
}

export default Input;
