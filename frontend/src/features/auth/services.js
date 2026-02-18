import axios from 'axios';
import config from '@config';

const server = `${config.server}/auth/`;

export const login = async ( formData ) => {
  try {
    const { data } = await axios.post(`${server}login`, formData, {
      withCredentials: true
    });
    return { data, error: null };
  } catch (err) {
    if (err.status === 409) {
      return { data: null, error: err.response?.data?.error };
    }
    throw err;
  }
}

export const register = async ( formData ) => {
  try {
    const { data } = await axios.post(`${server}register`, formData);

  return data;
  } catch (err) {
    if (err.status === 409) {
      return { error: err.response?.data?.error }
    }
    throw err;
  }
}

export const logout = async () => {
  const res = await axios.delete(`${server}logout`, {
    withCredentials: true
  });

  if (res.status < 400) {
    return { success: true }
  }
  
  return { error: res.data?.error }
}