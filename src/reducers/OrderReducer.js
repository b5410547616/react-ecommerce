import {
	ORDER_STATUS,
	ORDER_INFO,
	ORDER_INFO_CANCEL,
	ORDER_INFO_FETCH,
	ORDER_TOTAL_PRICE_FETCH
} from '../actions/types';

const INITIAL_STATE = {
	status: false,
	orderInfo: null,
	totalPrice: 0,
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case ORDER_STATUS:
			return { ...state, status: action.payload }
		case ORDER_INFO:
			return { ...state, orderInfo: action.payload }
		case ORDER_INFO_CANCEL:
			return { ...state, ...INITIAL_STATE }
		case ORDER_INFO_FETCH:
			return { ...state, orderInfo: action.payload }
		case ORDER_TOTAL_PRICE_FETCH:
			return { ...state, totalPrice: action.payload }
		default:
			return state;
	}
}