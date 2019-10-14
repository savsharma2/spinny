import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { TODO_TYPE } from '../../types';

import { noOps } from '../../utils';
import { Status } from '../../constants';
import { noop } from '@babel/types';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: 'none'
  }
}));

const getClassName = ({ status }) => {
  return (status === Status.COMPLETE ? '' : 'in') + 'complete';
};

const TodoText = ({ task, logTime }) => {
  const classes = useStyles();
  const [startTime, setStartTime] = useState();

  return (
    <table>
      <tbody>
        {Object.entries(task).map(([key, value]) => {
          return (
            <tr>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          );
        })}
      </tbody>
      <Button
        variant='contained'
        color='primary'
        disabled={startTime ? true : false}
        className={classes.button}
        onClick={() => {
          setStartTime(new Date());
        }}
      >
        Start Timer
      </Button>
      <Button
        variant='contained'
        disabled={!startTime ? true : false}
        color='secondary'
        className={classes.button}
        onClick={() => {
          logTime({ taskId: task.id, startTime, endTime: new Date() });
          setStartTime(undefined);
        }}
      >
        Stop Timer
      </Button>
    </table>
  );
};

const TodoItem = ({ task, onToggle, removeTask, logTime }) => {
  const { status, text, id } = task;
  return (
    <li
      className={getClassName({ status })}
      onClick={() => {
        onToggle(id);
      }}
    >
      {status === Status.COMPLETE ? (
        <span>
          &#10003;{' '}
          <s>
            <TodoText logTime={logTime} task={task}></TodoText>
          </s>
        </span>
      ) : (
        <TodoText logTime={logTime} task={task}></TodoText>
      )}
      <span className={'remove'}>
        <button
          onClick={e => {
            removeTask(id);
            e.stopPropagation();
          }}
        >
          X
        </button>
      </span>
    </li>
  );
};

TodoItem.defaultProps = {
  onToggle: noOps,
  removeTask: noOps,
  logTime: noOps
};

TodoItem.propTypes = {
  task: TODO_TYPE,
  onToggle: PropTypes.func,
  logTime: PropTypes.func
};

export default TodoItem;
