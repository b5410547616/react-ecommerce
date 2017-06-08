import { combineReducers } from 'redux';
import ProductReducer from './ProductReducer';
import AuthReducer from './AuthReducer';
import OrderReducer from './OrderReducer';

export default combineReducers({
	product : ProductReducer,
	auth: AuthReducer,
	order: OrderReducer
});