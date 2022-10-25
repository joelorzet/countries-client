import React from 'react';
import { sizeIcon } from '../../styles/sizes.js';

//size could be ==> 'sm' > 'small'; 'md' > 'medium'; 'lg' > 'large'
// default value its 'medium'

function SocialItem({ name, link, size, icon }) {
	return (
		<div>
			<a href={link} target='_blank' rel='noreferrer'>
				<img
					src={icon}
					alt={name}
					style={{
						boxSizing: 'border-box',
						width: sizeIcon[size] || sizeIcon.md,
						height: sizeIcon[size] || sizeIcon.md,
					}}
				/>
			</a>
		</div>
	);
}

export default SocialItem;
