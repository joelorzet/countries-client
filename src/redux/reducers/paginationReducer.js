const initialState = {
	currentPage: 1,
};

const reducerController = {
	SET_CURRENT_PAGE: (state, action) => ({ ...state, currentPage: action.payload }),
};

export default function paginationReducer(state = initialState, action) {
	return typeof reducerController[action.type] === 'function'
		? reducerController[action.type](state, action)
		: state;
}
