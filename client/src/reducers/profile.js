import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE } from '../actions/types';

const initState = {
  profile: null,
  profiles: [],
  loading: true,
  errors: null,
};

const profile = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return { ...state, profile: payload, loading: false };
    case PROFILE_ERROR:
      return { ...state, errors: payload, loading: false };
    case CLEAR_PROFILE:
      return { ...state, profile: null, loading: false }
    default:
      return state;
  }
};

export default profile;
