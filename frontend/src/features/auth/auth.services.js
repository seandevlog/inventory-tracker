import axios from 'axios';
import config from '../../config';

const server = `${config.server}/auth/`;

export const create = async ( formData ) => {
  await axios.post(`${server}register`, formData);
}