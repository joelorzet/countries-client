import React from 'react';
import gitIcon from './gitIcon.svg';
import linkedin from './linkedin.svg';
import style from './Social.module.css';

function Social() {
	return (
		<div className={style.container}>
			<a href='https://github.com/joelorzet' target='_blank' rel='noreferrer' className={style.link}>
				GitHub
				<img src={gitIcon} alt='git-Icon' className={style.icon} />
			</a>

			<a
				href='https://www.linkedin.com/in/joelorzet/'
				target='_blank'
				rel='noreferrer'
				className={style.link}
			>
				LinkedIn
				<img src={linkedin} alt='linkedin-Icon' className={style.icon} />
			</a>
		</div>
	);
}

export default Social;
