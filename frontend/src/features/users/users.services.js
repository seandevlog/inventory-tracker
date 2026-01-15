import axios from 'axios';
import config from '../../config';

const server = `${config.server}/users/`;

export const getAll = async () => {
  const { data } = await axios.get(server);

  return data.users;
}

export const get = async ({ id }) => {
  const { data } = await axios.get(`${server}${id}`)

  return data.user;
} 

export const create = async ( formData ) => {
  await axios.post(`${server}store`, formData);
}

export const edit = async ( formData ) => {
  const { data } = await axios.post()
}