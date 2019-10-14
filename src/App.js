import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './login';
import SignUp from './login/signUp';
import Task from './task';
export default class App extends Component {
  render() {
    return (
      <div className='App'>
        <Switch>
          <Route path='/'>
            Welcome
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/signUp'>
              <SignUp />
            </Route>
            <Route path='/tasks'>
              <Task />
            </Route>
          </Route>
        </Switch>
      </div>
    );
  }
}
