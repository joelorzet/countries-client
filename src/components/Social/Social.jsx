import React from 'react';
import SocialItem from '../SocialItem/SocialItem.jsx';
import { Media } from './socialMedia.js';
import style from './Social.module.css';

function Social() {
	return (
		<div className={style.container}>
			{Media?.map((e, i) => (
				<div key={i}>
					<SocialItem name={e.name} link={e.link} size='md' icon={e.icon} />
				</div>
			))}
		</div>
	);
}

export default Social;
