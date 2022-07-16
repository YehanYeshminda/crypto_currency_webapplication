import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, BrowserRouter as router } from 'react-router-dom';
import 'antd/dist/antd.css';
import Store from './App/Store.js';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		{/* all the pages inside of the store will have access to the Store varibale or the react tool kit */}
		<Provider store={Store}>
			<App />
		</Provider>
	</BrowserRouter>
);
