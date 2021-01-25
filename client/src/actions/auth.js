import axios from 'axios';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AUTH_SUCCESS,
  AUTH_NONE,
  AUTH_ERROR,
  CLEAR_AUTH_ERROR,
  CLEAR_PROFILE,
} from './types';

import setAuthToken from '../helpers/setAuthToken';

export const loadUser = () => async (dispatch) => {
  // if we have an auth token, set auth header
  if (localStorage['auth-token']) {
    setAuthToken(localStorage['auth-token']);

    try {
      const res = await axios.get('api/auth');
      dispatch({
        type: AUTH_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: [{ msg: 'Authentication failed' }],
      });
    }
  } else {
    dispatch({
      type: AUTH_NONE,
    });
  }
};

export const clearAuthErrors = () => {
  return {
    type: CLEAR_AUTH_ERROR,
  }
}

export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post('api/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    // if we get an array from server
    const errors =
      error.response && error.response.data && error.response.data.errors;

    // something else went wrong
    const payload = errors ? errors : [{ msg: 'Something went wrong' }];
    dispatch({
      type: REGISTER_FAIL,
      payload,
    });
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    const errors =
      error.response && error.response.data && error.response.data.errors;
    const payload = errors ? errors : [{ msg: 'Something went wrong' }];
    dispatch({
      type: LOGIN_FAIL,
      payload,
    });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
