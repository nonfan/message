import axios from 'axios';
import { message } from 'antd';
import { getToken, removeToken } from './localStorage';
import { url } from './config';

export default function request(config: any) {
  const instance = axios.create({
    baseURL: url,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  instance.interceptors.request.use((config) => {
    if (!!getToken) {
      config.headers.Authorization = getToken();
    }
    return config;
  });

  instance.interceptors.response.use(
    (config) => {
      return config;
    },
    (err) => {
      const { status, statusText } = err.response;

      if (status === 401) {
        removeToken();
      }

      if (status === 404) {
        return message.error(statusText);
      }

      message.error(err.response.data.error);
    }
  );

  return instance(config);
}
