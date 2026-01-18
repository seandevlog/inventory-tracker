import axios from 'axios';
import config from '../../config';

const server = `${config.server}/auth/`;

export const login = async ( formData ) => {
  const { data } = await axios.post(`${config.server}/auth/login`, formData);

  return data;
}

export const create = async ( formData ) => {
  await axios.post(`${server}register`, formData);
}