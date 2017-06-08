import axios from 'axios';
// import axiosFileupload from 'axios-fileupload';
import {
	ORDER_STATUS,
	ORDER_INFO,
	ORDER_INFO_CANCEL,
	ORDER_INFO_FETCH,
	ORDER_TOTAL_PRICE_FETCH
} from './types';

axios.defaults.baseURL = 'http://localhost:9000';
axios.defaults.withCredentials = true;

export const orderStatus = () => {
	return (dispatch) => {
		console.log("check orderStatus");
		axios.post('/getUserOrderStatus')
		.then((response) => {
			dispatch({ type: ORDER_STATUS, payload: response.data });
			if(!response.data) window.location = "/cart";
		})
		.catch((error) => console.log(error));
		
	}
}

export const orderInfoCreate = (orderInfo) => {
	return (dispatch) => {
		console.log("check orderInfoCreate");
		// dispatch({ type: ORDER_INFO, payload: orderInfo });
		axios.post('/createOrderInfo', { orderInfo })
		.then((response) => {
			dispatch({ type: ORDER_INFO, payload: response.data });
			window.location = "checkout-step-2";
		})
		.catch((error) => console.log(error));
	}
}

export const orderInfoCancel = () => {
	return (dispatch) => {
		console.log("check orderInfoCancel");
		dispatch({ type: ORDER_INFO_CANCEL });
	}
}

export const orderInfoFetch = () => {
	return (dispatch) => {
		console.log("check orderInfoCreate");
		axios.post('/getOrderInfo')
		.then((response) => {
			if(!response.data) window.location = "/cart"; 
			dispatch({ type: ORDER_INFO_FETCH, payload: response.data });
		})
		.catch((error) => console.log(error));
	}
}

export const orderTotalPriceFetch = () => {
	return (dispatch) => {
		console.log("check orderTotalPriceFetch");
		axios.post('/getOrderTotalPrice')
		.then((response) => {
			dispatch({ type: ORDER_TOTAL_PRICE_FETCH, payload: response.data.totalPrice });
		})
		.catch((error) => console.log(error));
	}
}