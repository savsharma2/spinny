import { ApiUrls } from '../constants';
import { getRandomInt } from '../utils';

export const LOGIN_USER = 'login/LOGIN_USER';
export const LOGIN_USER_FAIL = 'login/LOGIN_USER_FAIL';
export const LOGIN_USER_SUCCESS = 'login/LOGIN_USER_SUCCESS';

const LOGIN_URL = `${ApiUrls.Base}${ApiUrls.Login}`;
export const login = ({ email, password }) => {
  return async dispatch => {
    dispatch({
      type: LOGIN_USER,
      payload: { email, password }
    });
    try {
      const res = await fetch(LOGIN_URL, {
        qs: { email, password }
      });
      if (res.status === 200) {
        const data = await res.json();
        return dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: data
        });
      }
    } catch (err) {
      debugger;
    }
  };
};
// dispatch({
//   type: 'SIMPLE_ACTION',
//   payload: 'result_of_simple_action'
// });
