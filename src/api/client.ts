import axios from 'axios';

import store from 'src/store';

import { isNetworkError, throttledNotifyNetworkError } from './utils';

const client = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		'Content-Type': 'application/json',
		'Accept-Language': 'en',
	},
	__tokenRequired: true,
});

client.interceptors.request.use((config) => {
	if (config.__tokenRequired && config.headers) {
		const { access } = store.getState().auth;
		config.headers.Authorization = `Bearer ${access}`;
	}
	return config;
});

client.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (isNetworkError(error)) {
			throttledNotifyNetworkError();
		}
		return Promise.reject(error);
	}
);

const ApiClient = {
	get(url: string, params?: object, customConfigs?: object) {
		const configs = { params, ...customConfigs };
		return client.get(url, configs);
	},
	post(url: string, data?: object, customConfigs?: object) {
		return client.post(url, data, customConfigs);
	},
	put(url: string, data?: object, customConfigs?: object) {
		return client.put(url, data, customConfigs);
	},
	patch(url: string, data?: object, customConfigs?: object) {
		return client.patch(url, data, customConfigs);
	},
	delete(url: string, customConfigs?: object) {
		return client.delete(url, customConfigs);
	},
};

export default ApiClient;
