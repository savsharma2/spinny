import { ApiUrls } from '../constants';
import { getRandomInt } from '../utils';

export const LOAD_PROJECTS = 'projects/LOAD_PROJECTS';
export const LOAD_PROJECTS_FAIL = 'projects/LOAD_PROJECTS_FAIL';
export const LOAD_PROJECTS_SUCCESS = 'projects/LOAD_PROJECTS_SUCCESS';

const PROJECT_URL = `${ApiUrls.Base}${ApiUrls.Projects}`;


export const loadProjects = ({ userId }) => {
  return async dispatch => {
    dispatch({
      type: LOAD_PROJECTS,
      payload: { userId }
    });
    try {
      const res = await fetch(PROJECT_URL, {
        qs: { userId }
      });
      if (res.status === 200) {
        const data = await res.json();
        return dispatch({
          type: LOAD_PROJECTS_SUCCESS,
          payload: data
        });
      }
    } catch (err) {
      debugger;
    }
  };
};

// export const logTimer = ({ userId, startTime, endTime }) => {
//   return async dispatch => {
//     dispatch({
//       type: LOG_TIMER,
//       payload: { userId }
//     });
//     try {
//       const res = await fetch(LOG_TIMER_URL, {
//         mode: 'post',
//         headers: {
//           'Content-Type': 'application/json'
//           // 'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: JSON.stringify({ id: getRandomInt(), startTime, endTime })
//       });
//       if (res.status === 200) {
//         const data = await res.json();
//         return dispatch({
//           type: LOG_TIMER_SUCCESS,
//           payload: data
//         });
//       }
//     } catch (err) {
//       debugger;
//     }
//   };
// };
// dispatch({
//   type: 'SIMPLE_ACTION',
//   payload: 'result_of_simple_action'
// });
