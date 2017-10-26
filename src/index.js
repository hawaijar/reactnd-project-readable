import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import './index.css';
import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';

const Wrapper = () => {
  window.store = store;
  return (
    <BrowserRouter>
      <Provider store={store}>
        <MuiThemeProvider>
          <App />
        </MuiThemeProvider>
      </Provider>
    </BrowserRouter>
  );
};

ReactDOM.render(<Wrapper />, document.getElementById('root'));
registerServiceWorker();
