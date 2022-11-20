const initialState = {
	countriesAdded: {},
};

const reducerController = {
	TOOGLE_ADDITION: (state, action) => ({
		...state,
		countriesAdded: { ...state.countriesAdded, [action.payload]: !state.countriesAdded[action.payload] },
	}),
	CLEAR_COUNTRY_DETAIL: (state) => ({ ...state, countrie: {} }),
};

export default function formReducer(state = initialState, action) {
	return typeof reducerController[action.type] === 'function'
		? reducerController[action.type](state, action)
		: state;
}
