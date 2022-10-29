const initialState = {
	countrie: {},
};

const countrieDetailFunctions = {
	GET_COUNTRIE_DETAIL: (state, action) => ({ ...state, countrie: action.payload }),
	CLEAR_COUNTRY_DETAIL: (state) => ({ ...state, countrie: {} }),
};

export default function countrieDetailReducer(state = initialState, action) {
	return typeof countrieDetailFunctions[action.type] === 'function'
		? countrieDetailFunctions[action.type](state, action)
		: state;
}
