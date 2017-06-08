import { 
	// EMAIL_CHANGED, 
	// PASSWORD_CHANGED, 
	LOGIN_USER_SUCCESS, 
	LOGIN_USER_FAIL,
	// LOGIN_USER,
	LOGIN_USER_CHECK,
	// LOGOUT_USER,
	LOGOUT_USER_SUCCESS,
	REGISTER_USER,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAIL,
	USER_PROFILE,
	// USER_UPDATE,
	USER_UPDATE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = { 
	email: '', 
	password: '', 
	user: null,
	errorLogin: '',
	errorRegis: '',
	isLogin: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOGIN_USER_SUCCESS:
			return { ...state, ...INITIAL_STATE, user: action.payload };
		case LOGIN_USER_FAIL:
			return { ...state, errorLogin: 'Authentication Failed.', password: '', loading: false };
		case LOGIN_USER_CHECK:
			return { ...state, isLogin: action.payload };
		case LOGOUT_USER_SUCCESS:
			return { ...state, ...INITIAL_STATE };
		case USER_PROFILE:
			return { ...state, user: action.payload, isLogin: true };
		case USER_UPDATE_SUCCESS:
			return { ...state };
		case REGISTER_USER:
			return { ...state, errorRegis: '' };
		case REGISTER_USER_SUCCESS:
			return { ...state, ...INITIAL_STATE, user: action.payload };
		case REGISTER_USER_FAIL:
			return { ...state, ...INITIAL_STATE, errorRegis: 'Invalid Input, Please try again.' };
		default:
			return state;
	}
};

// switch (action.type) {
// 		// case EMAIL_CHANGED:
// 		// 	return { ...state, email: action.payload };
// 		// case PASSWORD_CHANGED:
// 		// 	return { ...state, password: action.payload };
// 		case LOGIN_USER_SUCCESS:
// 			return { ...state, ...INITIAL_STATE, user: action.payload };
// 		case LOGIN_USER_FAIL:
// 			return { ...state, errorLogin: 'Authentication Failed.', password: '', loading: false };
// 		case LOGIN_USER_CHECK:
// 			return { ...state, isLogin: action.payload };
// 		// case LOGOUT_USER:
// 		// 	return { ...state, loading: true };
// 		case LOGOUT_USER_SUCCESS:
// 			return { ...state, ...INITIAL_STATE };
// 		// case REGISTER_USER:
// 		// 	return { ...state, loading: true, error: '' };
// 		// case REGISTER_USER_SUCCESS:
// 		// 	return { ...state, ...INITIAL_STATE, user: action.payload };
// 		// case REGISTER_USER_FAIL:
// 		// 	return { ...state, ...INITIAL_STATE, errorRegis: 'Invalid Input, Please try again.' };
// 		case USER_PROFILE:
// 			return { ...state, user: action.payload };
// 		// case USER_UPDATE:
// 		// 	return { ...state, loading: true };
// 		// case USER_UPDATE_SUCCESS:
// 		// 	return { ...state, loading: false };
// 		default:
// 			return state;
// 	}