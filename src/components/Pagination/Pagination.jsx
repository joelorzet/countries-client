import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/actions/actions.js';
import Button from '../Button/Button.jsx';
import style from './Pagination.module.css';

function Pagination({ postPerPage, totalPosts, setPostPerPage, currentPage, setPageNumber }) {
	const dispatch = useDispatch();

	const pageNumbers = [];
	const itsFirtPage = currentPage !== 1 ? true : false;
	setPostPerPage(9 + itsFirtPage);

	const NavButtons = Math.ceil(totalPosts / postPerPage);

	for (let i = 1; i < NavButtons + 1; i++) {
		pageNumbers.push(i);
	}

	const previous = currentPage - 3 >= 1 ? currentPage - 3 : 0;
	const nexts = currentPage + 3 < NavButtons ? currentPage + 3 : NavButtons;

	const previousButtons = pageNumbers.slice(previous, currentPage);
	const nextButtons = pageNumbers.slice(currentPage, nexts);

	return (
		<nav>
			<ul className={style.pageNumbers}>
				{currentPage > 1 && (
					<Button
						value='Prev'
						className='btnLow'
						onClick={() => {
							dispatch(setCurrentPage(currentPage - 1));
							setPageNumber(currentPage - 1);
						}}
					/>
				)}

				{previousButtons?.map((e) => {
					return (
						<Button
							value={e}
							onClick={() => {
								dispatch(setCurrentPage(e));
								setPageNumber(e);
							}}
							key={e}
							className={(e === currentPage && 'selected') || 'btnLow'}
						/>
					);
				})}

				{nextButtons.map((e) => {
					return (
						<Button
							value={e}
							onClick={() => {
								dispatch(setCurrentPage(e));
								setPageNumber(currentPage + 1);
							}}
							key={e}
							className={(e === currentPage && 'selected') || 'btnLow'}
						/>
					);
				})}

				{currentPage < NavButtons && (
					<Button
						value='Next'
						className='btnLow'
						onClick={() => {
							dispatch(setCurrentPage(currentPage + 1));
						}}
					/>
				)}
			</ul>
		</nav>
	);
}

export default Pagination;
