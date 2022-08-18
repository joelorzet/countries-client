import React from 'react';
import style from './Button.module.css';

function Button({ value, onClick, type, className, disabled }) {
	if (disabled) {
		return (
			<div>
				<button type={type} disabled onClick={onClick} className={style.danger}>
					{value}
				</button>
			</div>
		);
	} else {
		return (
			<div>
				<button type={type} onClick={onClick} className={style[className]}>
					{value}
				</button>
			</div>
		);
	}
}

export default Button;
