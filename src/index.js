import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Root from './root';

const Wrapper = () => {
  window.store = store;
  return (
    <BrowserRouter>
      <Root store={store} />
    </BrowserRouter>
  );
};

ReactDOM.render(<Wrapper />, document.getElementById('root'));
registerServiceWorker();
