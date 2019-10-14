import PropTypes from 'prop-types';


export const TODO_TYPE = PropTypes.shape({
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired
});
