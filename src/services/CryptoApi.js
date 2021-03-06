// used with redux to get the data from the rapid api

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cruptoApiHeader = {
	'X-RapidAPI-Key': 'a49b89ab05msh2298f1c9ad62e02p18eddcjsn87b4e0935a55',
	'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
};

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cruptoApiHeader });

export const cryptoApi = createApi({
	reducerPath: 'cryptoApi',
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: (builder) => ({
		getCryptos: builder.query({
			query: (count) => createRequest(`/coins?limit=${count}`),
		}),

		getCryptoDetails: builder.query({
			query: (coinId) => createRequest(`/coin/${coinId}`),
		}),
	}),
});

export const { useGetCryptosQuery, useGetCryptoDetailsQuery } = cryptoApi;
