import { ApiUrls } from '../constants';
import { getRandomInt } from '../utils';

export const LOG_TIMER = 'timer/LOG_TIMER';
export const LOG_TIMER_FAIL = 'projects/LOG_TIMER_FAIL';
export const LOG_TIMER_SUCCESS = 'projects/LOG_TIMER_SUCCESS';

export const LOAD_TASKS = 'tasks/LOAD_TASKS';
export const LOAD_TASKS_FAIL = 'tasks/LOAD_TASKS';
export const LOAD_TASKS_SUCCESS = 'tasks/LOAD_TASKS_SUCCESS';

const LOG_TIMER_URL = `${ApiUrls.Base}${ApiUrls.TimeLogs}`;
const TASK_URL = `${ApiUrls.Base}${ApiUrls.Tasks}`;

export const loadTasks = ({ userId, projects }) => {
  return async dispatch => {
    dispatch({
      type: LOAD_TASKS,
      payload: { userId, projects }
    });
    try {
      const res = await fetch(
        `${TASK_URL}?userId=${userId}${projects
          .map(id => {
            return `&projectId[]=${id}`;
          })
          .join('')}`
      );
      if (res.status === 200) {
        const data = await res.json();
        return dispatch({
          type: LOAD_TASKS_SUCCESS,
          payload: data
        });
      }
    } catch (err) {
      debugger;
    }
  };
};
export const logTime = ({ taskId, startTime, endTime }) => {
  return async dispatch => {
    dispatch({
      type: LOG_TIMER,
      payload: { taskId }
    });
    try {
      const res = await fetch(LOG_TIMER_URL, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify({
          id: getRandomInt(),
          taskId,
          startTime: startTime.toString(),
          endTime: endTime.toString()
        })
      });
      if (res.status === 200) {
        const data = await res.json();
        return dispatch({
          type: LOG_TIMER_SUCCESS,
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
