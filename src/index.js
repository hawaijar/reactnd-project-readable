import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

const Wrapper = () =>
	<BrowserRouter>
		<App />
	</BrowserRouter>;

ReactDOM.render(<Wrapper />, document.getElementById('root'));
registerServiceWorker();
