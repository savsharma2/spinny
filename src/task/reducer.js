import { LOAD_TASKS, LOAD_TASKS_SUCCESS } from './action';
export default (
  state = { isLoading: false, isLoaded: false, tasks: [] },
  action
) => {
  switch (action.type) {
    case LOAD_TASKS:
      return {
        ...state,
        isLoading: true,
        isLoaded: false
      };
    case LOAD_TASKS_SUCCESS:
      if (action.payload) {
        return {
          ...state,
          isLoading: false,
          isLoaded: true,
          tasks: action.payload
        };
      }
    default:
      return state;
  }
};

export const getTasks = state => state.task.tasks;
