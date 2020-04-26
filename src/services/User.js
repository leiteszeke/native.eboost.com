import {basicClient} from './client';

export const login = (data) =>
  basicClient.post('auth/login', data, {public: true});

export const register = (data, type) =>
  basicClient.post(`auth/register/${type}`, data, {public: true});

export const get = (type) => basicClient.get(`profile/${type.toLowerCase()}`);

export default {login, register, get};
