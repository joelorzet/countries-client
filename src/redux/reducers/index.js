import { combineReducers } from 'redux';
import pagination from './paginationReducer.js';
import countrieDetail from './countrieDetailReducer.js';
import countriesLoaded from './countriesLoadedReducer.js';
import formReducer from './formReducer.js';

export default combineReducers({ countriesLoaded, countrieDetail, pagination, formReducer });
