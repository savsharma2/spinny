import MultiDropDown from '../components/multiDropDown';
import { loadProjects } from './action';
import { getProjects } from './reducer';
import { getCurrentUser } from '../login/reducer';
import { connect } from 'react-redux';

export default connect(
  state => ({ userId: getCurrentUser(state), data: getProjects(state) }),
  {
    loadProjects
  },
  ({ userId, data }, { loadProjects }, { onSelected }) => {
    return {
      getData: () => {
        return loadProjects(userId);
      },
      data,
      onSelected: (...args) => {
        onSelected(...args);
      }
    };
  }
)(MultiDropDown);
