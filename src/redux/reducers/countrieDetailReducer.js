import { GET_COUNTRIE_DETAIL, CLEAR_COUNTRY_DETAIL } from '../actions/actions.js';

const initialState = {
	countrie: {},
};

export default function countrieDetailReducer(state = initialState, action) {
	switch (action.type) {
		case GET_COUNTRIE_DETAIL:
			return { ...state, countrie: action.payload };

		case CLEAR_COUNTRY_DETAIL:
			return { ...state, countrie: {} };

		default:
			return state;
	}
}
