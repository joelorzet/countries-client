const initialState = {
	currentPage: 1,
};

const paginationFunctions = {
	SET_CURRENT_PAGE: (state, action) => ({ ...state, currentPage: action.payload }),
};

export default function paginationReducer(state = initialState, action) {
	return typeof paginationFunctions[action.type] === 'function'
		? paginationFunctions[action.type](state, action)
		: state;
}
