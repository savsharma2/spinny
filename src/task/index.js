import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import { getCurrentUser } from '../login/reducer';
import { getProjects } from '../project/reducer';
import MultiDropDown from '../components/multiDropDown';
import { loadProjects } from '../project/action';
import { loadTasks, logTime } from './action';
import { getTasks } from './reducer';
import Task from './component';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}));

const Tasks = ({
  loadProjects,
  userId,
  projects,
  loadTasks,
  logTime,
  tasks
}) => {
  const classes = useStyles();
  useEffect(() => {
    loadProjects({ userId });
  }, [userId]);

  return [
    <Grid container component='main' className={classes.root}>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <MultiDropDown data={projects} onSelected={loadTasks}></MultiDropDown>
      </Grid>
    </Grid>,
    <Grid container component='main' className={classes.root}>
      <Task tasks={tasks} logTime={logTime}></Task>
    </Grid>
  ];
};

export default connect(
  state => ({
    userId: getCurrentUser(state),
    projects: getProjects(state),
    tasks: getTasks(state)
  }),
  {
    loadProjects,
    loadTasks,
    logTime
  },
  ({ userId, projects, tasks }, { loadProjects, loadTasks, logTime }, ownProps) => {
    debugger;
    return {
      // getData: () => {
      //   return loadProjects(userId);
      // },
      ...ownProps,
      tasks,
      logTime,
      projects,
      loadProjects,
      loadTasks: projects => {
        loadTasks({ userId, projects: projects.map(({ id }) => id) });
        // onSelected(...args);
      }
    };
  }
)(Tasks);
