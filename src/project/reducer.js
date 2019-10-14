import { LOAD_PROJECTS, LOAD_PROJECTS_SUCCESS } from './action';
export default (
  state = { isLoading: false, isLoaded: false, projects: [] },
  action
) => {
  switch (action.type) {
    case LOAD_PROJECTS:
      return {
        ...state,
        isLoading: true,
        isLoaded: false
      };
    case LOAD_PROJECTS_SUCCESS:
      if (action.payload) {
        return {
          ...state,
          isLoading: false,
          isLoaded: true,
          projects: action.payload
        };
      }
    default:
      return state;
  }
};

export const getProjects = state => state.project.projects;
