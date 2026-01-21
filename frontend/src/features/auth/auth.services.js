import axios from 'axios';
import config from '../../config';

const server = `${config.server}/auth/`;

export const login = async ( formData ) => {
  try {
    const { data } = await axios.post(`${server}login`, formData, {
      withCredentials: true
    });
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return { error: err.response }
    }
  }
}

export const register = async ( formData ) => {
  const { data } = await axios.post(`${server}register`, formData);

  return data;
}

export const refresh = async () => {
  try {
    const { data } = await axios.get(`${server}refresh`, {
      withCredentials: true
    });

    const { error } = data;
    if (error) throw new Error(error); 

    return data;
  } catch (err) {
    ; // Do nothing
  }
} 

export const logout = async () => {
  const { data } = await axios.delete(`${server}logout`, {
    withCredentials: true
  });

  return data;
}