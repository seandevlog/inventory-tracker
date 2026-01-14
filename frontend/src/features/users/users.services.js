import axios from 'axios';
import config from '../../config';

const server = `${config.server}/users/`;

export const getAllUser = async () => {
  const { data } = await axios.get(server);

  return data.users;
}

export const getUser = async ( id ) => {
  console.log(`${server}${id}`);
  const { data } = await axios.get(`${server}${id}`)

  return data.user;
} 