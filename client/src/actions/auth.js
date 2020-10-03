import axios from 'axios';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
} from './types';

import setAuthToken from '../helpers/setAuthToken';

export const loadUser = () => async (dispatch) => {
  // if we have an auth token, set auth header
  if (localStorage['auth-token']) {
    setAuthToken(localStorage['auth-token']);

    try {
      const res = await axios.get('api/auth');
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: { errors: [{ msg: 'Authentication failed' }] },
      });
    }
  } else {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

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
    const errors =
      error.response && error.response.data && error.response.data.errors;

    const payload = errors
      ? { errors }
      : { errors: [{ message: 'Something went wrong' }] };
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
    const payload = errors
      ? { errors }
      : { errors: [{ message: 'Something went wrong' }] };
    dispatch({
      type: LOGIN_FAIL,
      payload,
    });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
