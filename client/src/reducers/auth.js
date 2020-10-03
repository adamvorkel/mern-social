import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from '../actions/types';

const initState = {
  token: localStorage['auth-token'],
  isAuthenticated: null,
  user: null,
  loading: true,
  errors: null,
};

const auth = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return { ...state, isAuthenticated: true, loading: false, user: payload };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('auth-token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        errors: null,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      localStorage.removeItem('auth-token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        errors: payload.errors,
      };
    default:
      return state;
  }
};

export default auth;
