import axios from 'axios';
import config from '../../config';

const server = `${config.server}/auth/`;

export const login = async ( formData ) => {
  const { data } = await axios.post(`${config.server}/auth/login`, formData, {
    withCredentials: true
  });

  if (data.error) throw new Error(data.error);
  return data;
}

export const create = async ( formData ) => {
  const { data } = await axios.post(`${server}register`, formData);

  if (data.error) throw new Error(data.error);
}