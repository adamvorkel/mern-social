import axios from 'axios';

import { GET_PROFILE, PROFILE_ERROR } from './types';

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    const message = error.response && error.response.statusText;

    const payload = message
      ? { errors: [{ message }] }
      : { errors: [{ message: 'Something went wrong' }] };
    dispatch({
      type: PROFILE_ERROR,
      payload,
    });
  }
};
