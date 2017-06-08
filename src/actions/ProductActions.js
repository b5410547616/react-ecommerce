import axios from 'axios';
// import axiosFileupload from 'axios-fileupload';
import {
	// PRODUCT_UPDATE,
	// PRODUCT_CREATE,
	// PRODUCT_CREATE_SUCCESS,
	// PRODUCT_CREATE_FAIL,
	PRODUCT_FETCH_SUCCESS,
	PRODUCT_FETCH_BY_ID_SUCCESS,
	// PRODUCT_FETCH_BY_CAT_ID_SUCCESS,
	// PRODUCT_FETCH_BY_TEXT_SUCCESS,
	PRODUCT_FETCH_BANNER,
	PRODUCT_FETCH_CATEGORY,
	PRODUCT_FETCH_QUANTITY,
	// PRODUCT_FETCH_CITY,
	// PRODUCT_FETCH_DISTRICT
	// PRODUCT_SAVE_SUCCESS
	GALLERY_FETCH_BY_ID,
	CART_CREATE,
	CART_FETCH,
	CART_REMOVE,
	CART_UPDATE,
	WISH_CREATE,
	WISH_FETCH,
	WISH_REMOVE,
} from './types';

axios.defaults.baseURL = 'http://localhost:9000';
axios.defaults.withCredentials = true;


export const productFetchCategory = () => {
	return (dispatch) => {
		console.log('check productFetchCategory');
		axios.post('/getCategories', {})
		.then((response) => dispatch({ type: PRODUCT_FETCH_CATEGORY, payload: response.data }))
		.catch((response) => console.log('Unable to fetch categories.', response));
	};
};

export const productFetchBanner = () => {
	return (dispatch) => {
		console.log('check productFetchBanner');
		axios.post('/getBanner', {})
		.then((response) => dispatch({ type: PRODUCT_FETCH_BANNER, payload: response.data }))
		.catch((response) => console.log('Unable to fetch banner.', response));
	};
};

export const productFetch = () => {
	return (dispatch) => {
		console.log('check productFetch');
		axios.post('/getProducts', {})
		.then((response) => dispatch({ type: PRODUCT_FETCH_SUCCESS, payload: response.data }))
		.catch((error) => console.log(error));
	};
};

export const productFetchById = (prod_id) => {
	return (dispatch) => {
		console.log('check productFetchById');
		axios.post('/getProductById', {prod_id})
		.then((response) => dispatch({ type: PRODUCT_FETCH_BY_ID_SUCCESS, payload: response.data }))
		.catch((error) => console.log(error));
	};
};

// export const productFetchByCatId = (prod_catid, limit=0) => {
// 	return (dispatch) => {
// 		console.log('check productFetchByCatId');
// 		axios.post('/getProductByCatId', {prod_catid, limit})
// 		.then((response) => dispatch({ type: PRODUCT_FETCH_BY_CAT_ID_SUCCESS, payload: response.data }))
// 		.catch((error) => console.log(error));
// 	};
// };

export const galleryFetchById = (prod_id) => {
	return (dispatch) => {
		console.log('check galleryFetchById');
		axios.post('/getGalleryByProdId', {prod_id})
		.then((response) => dispatch({ type: GALLERY_FETCH_BY_ID, payload: response.data }))
		.catch((error) => console.log(error));
	};
}

export const productFetchQuantity = (prod_id) => {
	return (dispatch) => {
		console.log('check productFetchQuantity');
		axios.post('/getQuantityByProdId', {prod_id})
		.then((response) => dispatch({ type: PRODUCT_FETCH_QUANTITY, payload: response.data }))
		.catch((error) => console.log(error));
	};
}

const cartUserFetchLocal = (dispatch) => {
	console.log('check cartUserFetch');
	axios.post('/getUserCart', {})
	.then((response) => dispatch({ type: CART_FETCH, payload: response.data }))
	.catch((error) => console.log(error));
}

export const cartUserCreate = ({ prod_id, quan_id, cart_no }) => {
	return (dispatch) => {
		console.log('check cartUserCreate');
		axios.post('/addUserCart', { prod_id, quan_id, cart_no })
		.then((response) => {
			dispatch({ type: CART_CREATE, payload: response.data });
			cartUserFetchLocal(dispatch);
		})
		.catch((error) => console.log(error));
	};
};

export const cartUserFetch = () => {
	return (dispatch) => {
		// console.log('check cartUserFetch');
		cartUserFetchLocal(dispatch);
	};
}

export const cartUserUpdate = (carts = null, cart_status) => {
	return (dispatch) => {
		console.log('check cartUserUpdate Status ' + cart_status);

		if(cart_status === 0) {
			axios.post('/updateUserCartStatus0')
			.then((response) => {
				dispatch({ type: CART_UPDATE, payload: response.data });
				window.location = "/cart";
			})
			.catch((error) => console.log(error));
		} else if(cart_status === 1) {
			let carts_id = "";
			let quans_id = "";
			let sql_quan = "(CASE ";
			let sql_cart = "(CASE ";
			carts.map((cart) => {
				carts_id += cart.cart_id + ",";
				quans_id += cart.quan_id + ",";
				sql_quan += "WHEN quan_id = " + cart.quan_id + " THEN quan_no-" + cart.cart_no + " ";
				sql_cart += "WHEN cart_id = " + cart.cart_id + " THEN " + cart.cart_no + " ";
				return 0;
			});
			carts_id = carts_id.substring(0, carts_id.length - 1);
			quans_id = quans_id.substring(0, quans_id.length - 1);
			sql_quan += "END)";
			sql_cart += "END)";
			
			axios.post('/updateUserCartStatus1', { carts_id, quans_id, sql_quan, sql_cart, cart_status })
			.then((response) => {
				dispatch({ type: CART_UPDATE, payload: response.data });
				window.location = "/checkout-step-1";
			})
			.catch((error) => console.log(error));
		} else if (cart_status === 2) {
			axios.post('/updateUserCartStatus2')
			.then((response) => {
				dispatch({ type: CART_UPDATE, payload: response.data });
				window.location = "/all-orders";
			})
			.catch((error) => console.log(error));
		}
	}
}

export const cartUserRemove = (cart_id) => {
	return (dispatch) => {
		console.log('check cartUserRemove');
		axios.post('/removeUserCart', { cart_id })
		.then((response) => {
			dispatch({ type: CART_REMOVE, payload: response.data });
			cartUserFetchLocal(dispatch);
		})
		.catch((error) => console.log(error));
	};
};

const wishUserFetchLocal = (dispatch) => {
	console.log('check wishUserFetch');
	axios.post('/getUserWish', {})
	.then((response) => dispatch({ type: WISH_FETCH, payload: response.data }))
	.catch((error) => console.log(error));
}

export const wishUserFetch = () => {
	return (dispatch) => {
		wishUserFetchLocal(dispatch);
	};
}

export const wishUserRemove = (wish_id) => {
	return (dispatch) => {
		console.log('check wishUserRemove');
		axios.post('/removeUserWish', { wish_id })
		.then((response) => {
			dispatch({ type: WISH_REMOVE, payload: response.data });
			wishUserFetchLocal(dispatch);
		})
		.catch((error) => console.log(error));
	};
};

export const wishUserCreate = (prod_id) => {
	return (dispatch) => {
		console.log('check wishUserCreate');
		axios.post('/addUserWish', { prod_id })
		.then((response) => {
			dispatch({ type: WISH_CREATE, payload: response.data });
			cartUserFetchLocal(dispatch);
		})
	}
};



// export const productUpdate = ({ props, value }) => {
// 	return {
// 		type: PRODUCT_UPDATE,
// 		payload: { props, value }
// 	};
// };



// const productFetchUpdate = (dispatch) => {
// 	axios.post('/getProducts', {})
// 	.then((response) => {
// 		console.log('productFetch', response.data);
// 		const products = response.data;
// 		dispatch({ type: PRODUCT_FETCH_SUCCESS, payload: products });
// 	})
// 	.catch((error) => {
// 		console.log(error);
// 	});
// };

// export const productFetchByText = (searchText) => {
// 	return (dispatch) => {
// 		console.log('productFetchByText: ', searchText);
// 		// if (searchText !== '') {
// 			axios.post('/getSearchProducts', { searchText })
// 			.then((response) => {
// 				console.log('productFetchByText', response.data);
// 				const products = response.data;
// 				dispatch({ type: PRODUCT_FETCH_BY_TEXT_SUCCESS, payload: products });
// 			})
// 			.catch((error) => {
// 				console.log(error);
// 			});
// 		// } 
// 		// else {
// 		// 	dispatch({ type: PRODUCT_FETCH_BY_TEXT_SUCCESS, payload: [] });
// 		// }
// 	};
// };


// export const productFetchCity = () => {
// 	return (dispatch) => {
// 		axios.post('/getCities', {})
// 		.then((response) => dispatch({ type: PRODUCT_FETCH_CITY, payload: response.data }))
// 		.catch((response) => console.log('Unable to fetch cities.', response));
// 	};
// };

// export const productFetchDistrict = (city_id) => {
// 	return (dispatch) => {
// 		axios.post('/getDistrictByCityId', { city_id })
// 		.then((response) => dispatch({ type: PRODUCT_FETCH_DISTRICT, payload: response.data }))
// 		.catch((response) => console.log('Unable to fetch district.', response));
// 	};
// };

// export const productCreate = (prod_name, prod_catid, prod_description, prod_price, prod_districtid, prod_cityid, prod_phone, files) => {
// 	return (dispatch) => {
// 		dispatch({ type: PRODUCT_CREATE });
// 		if (prod_name && prod_catid && prod_description && prod_price && prod_districtid && prod_cityid && prod_phone && files.length > 0) {
// 			axios.post('/addProduct', {
// 				prod_name,
// 				prod_catid,
// 				prod_description,
// 				prod_price,
// 				prod_districtid,
// 				prod_cityid,
// 				prod_phone
// 			})
// 			.then((response) => productUploadImage(dispatch, files, response.data.prod_id))
// 			.catch((response) => productCreateFail(dispatch, response));
// 		} else {
// 			productCreateFail(dispatch);
// 		}
// 	};
// };

// // const productUploadImage = (dispatch, files, prod_id) => {
// // 	for (let i = 0; i < files.length; i++) {
// // 		axios.post('/upload', { 
// // 			file: files[i] 
// // 		})
// // 		.then(() => productUploadImageSuccess(dispatch, files, prod_id))
// // 		.catch((response) => productCreateFail(dispatch, response));
// // 	}
// // };

// const productUploadImage = (dispatch, files, prod_id) => {
// 	axios.post('/addGallery', {
// 		files,
// 		prod_id
// 	})
// 	.then(() => productCreateSuccess(dispatch))
// 	.catch((response) => productCreateFail(dispatch, response));
// };

// const productCreateSuccess = (dispatch) => {
// 	dispatch({ type: PRODUCT_CREATE_SUCCESS });
// 	console.log('Create Product Successfully');
// 	productFetchUpdate(dispatch);
// 	// Actions.accountList({ type: 'refresh' });
// 	Actions.sellForm({ type: 'back' });
// };

// const productCreateFail = (dispatch, response) => {
// 	dispatch({ type: PRODUCT_CREATE_FAIL });
// 	console.log('Unable to Create Product', response);
// };

// export const uploadImage = (file) => {
// 	return () => {
// 		axios.post('/upload', { 
// 			file
// 		})
// 		.then(() => console.log('Image is uploaded.'))
// 		.catch((response) => console.log('Image failed to upload', response));
// 	};
// };
