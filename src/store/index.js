import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(thunk),
		typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
			? window.devToolsExtension()
			: f => f
	)
);
// store.subscribe(() => {
// 	 eslint-disable no-console
// 	console.log('1', store.getState());
// });

export default store;
