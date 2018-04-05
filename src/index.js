import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // thunk (middleware): permite que un action creator devuelva 
								 //		   una función en lugar de plain-object y 
								 //		   maneja el comportamiento asincrono.

import { Provider } from 'react-redux';
import rootReducer from './reducers';
import { fetchMemes } from './actions';


const store = createStore(rootReducer, applyMiddleware(thunk));

store.subscribe(() => console.log('store', store.getState()));
store.dispatch(fetchMemes());

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
		, document.getElementById('root'));