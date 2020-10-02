import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';

const reducers = combineReducers({
  alert,
  auth,
});

export default reducers;
