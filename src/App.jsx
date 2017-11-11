import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import MainPage from './components/MainPage';
import DetailedPage from './components/DetailedPage';

import './App.css';

const NotFound = () => (
  <div>
    <h3>404 page not found</h3>
    <p>We are sorry but the page you are looking for does not exist.</p>
  </div>
);

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="/:category/:id" component={DetailedPage} />
      <Route path="/:category" component={MainPage} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default App;
