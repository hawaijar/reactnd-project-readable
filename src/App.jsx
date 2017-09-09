import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import MainPage from './components/MainPage';
import DetailedPage from './components/DetailedPage';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/post/:id" component={DetailedPage} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
