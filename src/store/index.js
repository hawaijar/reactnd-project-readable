import { createStore } from 'redux';
//import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { loadState, saveState } from '../localStorage';

//localStorage.clear();
const persistedState = loadState();

const store = createStore(rootReducer, persistedState);
store.subscribe(() => {
	saveState(store.getState());
});

window.store = store;

export default store;
