import React from 'react';
import PropTypes from 'prop-types';

import TodoItem from './TodoItem';

import { TODO_TYPE } from '../../types';
import { noOps } from '../../utils';

import './todo.css';
class Todo extends React.Component {
  static propTypes = {
    tasks: PropTypes.arrayOf(TODO_TYPE),
    logTime: PropTypes.func,
    toggleTask: PropTypes.func
  };

  static defaultProps = {
    tasks: [],
    logTime: noOps,
    toggleTask: noOps
  };

  render() {
    const {
      props: { tasks, addTask, logTime, removeTask, toggleTask }
    } = this;

    return (
      <ul className='todoList'>
        {tasks.map(task => {
          return (
            <TodoItem
              key={task.id}
              task={task}
              removeTask={removeTask}
              onToggle={toggleTask}
              logTime={logTime}
            />
          );
        })}
      </ul>
    );
  }
}

export default Todo;
