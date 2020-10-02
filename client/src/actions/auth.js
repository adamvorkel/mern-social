import axios from 'axios';

import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';

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
  } catch (error) {
    const errors =
      error.response && error.response.data && error.response.data.errors;

    const payload = errors ? errors : [{ message: 'Something went wrong' }];
    dispatch({
      type: REGISTER_FAIL,
      payload,
    });
  }
};
