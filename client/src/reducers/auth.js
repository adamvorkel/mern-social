import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';

const initState = {
  token: localStorage.getItem('auth-token'),
  isAuthenticated: null,
  user: null,
  loading: true,
};

const auth = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem('auth-token', payload.token);
      return { ...state, ...payload, isAuthenticated: true, loading: false };
    case REGISTER_FAIL:
      localStorage.removeItem('auth-tokens');
      console.log('Register errors', payload);
      return { ...state, token: null, isAuthenticated: false, loading: false };
    default:
      return state;
  }
};

export default auth;
