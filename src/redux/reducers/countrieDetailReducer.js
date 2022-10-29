const initialState = {
	countrie: {},
};

const reducerController = {
	GET_COUNTRIE_DETAIL: (state, action) => ({ ...state, countrie: action.payload }),
	CLEAR_COUNTRY_DETAIL: (state) => ({ ...state, countrie: {} }),
};

export default function countrieDetailReducer(state = initialState, action) {
	return typeof reducerController[action.type] === 'function'
		? reducerController[action.type](state, action)
		: state;
}
