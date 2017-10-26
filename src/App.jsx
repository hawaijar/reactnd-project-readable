import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import MainPage from './components/MainPage';
import DetailedPage from './components/DetailedPage';

import './App.css';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/post/:id" component={DetailedPage} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default App;
