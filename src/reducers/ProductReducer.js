import {
	PRODUCT_FETCH_SUCCESS,
	PRODUCT_FETCH_BY_ID_SUCCESS,
	// PRODUCT_FETCH_BY_CAT_ID_SUCCESS,
	// PRODUCT_FETCH_BY_TEXT_SUCCESS,
	PRODUCT_FETCH_BANNER,
	PRODUCT_FETCH_CATEGORY,
	PRODUCT_FETCH_QUANTITY,
	// PRODUCT_FETCH_CITY,
	// PRODUCT_FETCH_DISTRICT,
	// PRODUCT_CREATE,
	// PRODUCT_CREATE_SUCCESS,
	// PRODUCT_CREATE_FAIL
	GALLERY_FETCH_BY_ID,
	CART_CREATE,
	CART_FETCH,
	CART_REMOVE,
	CART_UPDATE,
	WISH_CREATE,
	WISH_FETCH,
	WISH_REMOVE,
} from '../actions/types';

const INITIAL_STATE = {
	productList: null,
	productItem: null,
	banners: [],
	categories: [],
	cities: [],
	districts: [],
	gallery: null,
	quantity: null,
	error: '',
	cart: null,
	wishlist: null,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case PRODUCT_FETCH_SUCCESS:
			return { ...state, productList: action.payload };
		case PRODUCT_FETCH_BY_ID_SUCCESS:
			return { ...state, productItem: action.payload };
		// case PRODUCT_FETCH_BY_CAT_ID_SUCCESS:
		// 	return { ...state, productList: action.payload };
		// case PRODUCT_FETCH_BY_TEXT_SUCCESS:
		// 	return { ...state, productList: action.payload };
		case PRODUCT_FETCH_BANNER:
			return { ...state, banners: action.payload };
		case PRODUCT_FETCH_CATEGORY:
			return { ...state, categories: action.payload };
		case PRODUCT_FETCH_QUANTITY:
			return { ...state, quantity: action.payload }; 
		// case PRODUCT_FETCH_CITY:
		// 	return { ...state, cities: action.payload };
		// case PRODUCT_FETCH_DISTRICT:
		// 	return { ...state, districts: action.payload };
		// case PRODUCT_CREATE:
		// 	return { ...state, loading: true };
		// case PRODUCT_CREATE_SUCCESS:
		// 	return { ...state, ...INITIAL_STATE };
		// case PRODUCT_CREATE_FAIL:
		// 	return { ...state, loading: false, error: 'Fail to create product. Something is missing' };
		case GALLERY_FETCH_BY_ID:
			return { ...state, gallery: action.payload }

		case CART_CREATE:
		case CART_REMOVE:
		case CART_UPDATE:
			return { ...state }
		case CART_FETCH:
			return { ...state, cart: action.payload }

		case WISH_CREATE:
		case WISH_REMOVE:
			return { ...state }
		case WISH_FETCH:
			return { ...state, wishlist: action.payload }

		default:
			return state;
	}
};
