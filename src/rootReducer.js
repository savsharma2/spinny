import { combineReducers } from 'redux';
import login from './login/reducer';
import project from './project/reducer';
import task from './task/reducer';

export default combineReducers({
  login,
  project,
  task
});
