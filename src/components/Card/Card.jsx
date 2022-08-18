import React from 'react';
import { Link } from 'react-router-dom';
import style from './Card.module.css';

function Card({ name, flag, continent, id }) {
	return (
		<Link to={`/home/countrie-detail/${id}`} key={id} className={style.cardContainter}>
			<div>
				<div>
					<img src={flag} className={style.img} alt='countrie-flag' />
				</div>
				<div className={style.content}>
					<h4 className={style.title}>País: {name}</h4>
					<p>Continente: {continent}</p>
				</div>
			</div>
		</Link>
	);
}

export default Card;
