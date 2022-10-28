import { SET_CURRENT_PAGE } from '../actions/actions';

const initialState = {
	currentPage: 1,
};

export default function paginationReducer(state = initialState, action) {
	switch (action.type) {
		case SET_CURRENT_PAGE:
			return { ...state, currentPage: action.payload };

		default:
			return state;
	}
}
