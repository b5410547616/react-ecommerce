import axios from 'axios';
// import { Actions } from 'react-native-router-flux';
import {
	// LOGIN_USER,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAIL,
	LOGIN_USER_CHECK,
	// LOGOUT_USER,
	LOGOUT_USER_SUCCESS,
	REGISTER_USER,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAIL,
	USER_PROFILE,
	// USER_UPDATE,
	USER_UPDATE_SUCCESS
} from './types';

axios.defaults.baseURL = 'http://localhost:9000';
axios.defaults.withCredentials = true;

export const loginUser = ({ login_email, login_password }) => {
	return (dispatch) => {
		// dispatch({ type: LOGIN_USER });
		axios.post('/login', {
			user_email: login_email,
			user_password: login_password
		})
		.then((user) => {
			if (user.data.checker) {
				loginUserSuccess(dispatch, user);
			} else {
				loginUserFail(dispatch);
			}
		})
		.catch(() => loginUserFail(dispatch));	
	};
};

const loginUserSuccess = (dispatch, user) => {
	// console.log(user);
	dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
	window.location = "/"
	// Actions.accountList('Profile', 'Stocks', 'Logout');
	// Actions.accountList({ type: 'reset' });
};

const loginUserFail = (dispatch) => {
	// console.log('fail to login');
	dispatch({ type: LOGIN_USER_FAIL });
};

export const loginUserCheck = () => {
	return (dispatch) => {
		axios.post('/getUserAuth', {})
		.then(() => dispatch({ type: LOGIN_USER_CHECK, payload: true }))
		.catch(() => dispatch({ type: LOGIN_USER_CHECK, payload: false }));
	};
};

export const userProfile = () => {
	return (dispatch) => {
		axios.post('/getUser', {})
		.then((response) => dispatch({ type: USER_PROFILE, payload: response.data }))
		.catch(() => console.log('Unable to get user profile.'));
	};
};

export const logoutUser = () => {
	return (dispatch) => {
		// dispatch({ type: LOGOUT_USER });
		axios.post('/logout', {})
		.then(() => logoutUserSuccess(dispatch))
		.catch(() => console.log('Error unable to Logout'));
	};
};

const logoutUserSuccess = (dispatch) => {
	dispatch({ type: LOGOUT_USER_SUCCESS });
};

export const registerUser = ({ firstname, lastname, email, password, repassword }) => {
	return (dispatch) => {
		dispatch({ type: REGISTER_USER });
		if (validateEmail(email)) {
			if (password === repassword) {
				axios.post('/validating', {
					user_email: email
				})
				.then((response) => {
					if (response.data.checker) {
						axios({
							method: 'post',
							url: '/register',
							data: {
								user_firstname: firstname,
								user_lastname: lastname,
								user_email: email,
								user_password: password,
								user_type: 1
							}
						})
						.then(() => registerUserSuccess(dispatch)); // User has registered successfully
					} else {
						registerUserFail(dispatch);
					}
				})
				.catch(() => registerUserFail(dispatch));
			} else {
				registerUserFail(dispatch);
			}
		} else {
			registerUserFail(dispatch);
		}
	};
};

const validateEmail = (email) => {
	// eslint-disable-next-line no-useless-escape
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const registerUserSuccess = (dispatch) => {
	dispatch({ type: REGISTER_USER_SUCCESS });
	window.location = '/'
	// Actions.accountList({ type: 'reset' });
};

const registerUserFail = (dispatch) => {
	dispatch({ type: REGISTER_USER_FAIL });
};



export const userUpdate = ({ id, firstname, lastname, email }) => {
	return (dispatch) => {
		axios.post('/updateUser', {
			user_id: id,
			user_firstname: firstname,
			user_lastname: lastname,
			user_email: email
		})
		.then(() => userUpdateSuccess(dispatch))
		.catch(() => console.log('Unable to update your profile.'));
	};
};

const userUpdateSuccess = (dispatch) => {
	dispatch({ type: USER_UPDATE_SUCCESS });
	// eslint-disable-next-line no-undef
	alert('You have successfully updated your profile.');
};
