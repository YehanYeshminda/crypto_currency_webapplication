// store which stores all the api calles from rapid api

import { configureStore } from '@reduxjs/toolkit';

import { cryptoApi } from '../services/CryptoApi';
export default configureStore({
	reducer: {
		[cryptoApi.reducerPath]: cryptoApi.reducer,
	},
});
