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
    if (axios.isAxiosError(err) && err.response?.status === 409) {
      return { data: null, error: err.response.data?.error ?? err.message };
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
  try {
    await axios.delete(`${server}logout`, {
      withCredentials: true
    });

    return { success: true, error: null };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return { success: false, error: err.response?.data };
    }
    return { success: false, error: err.message || 'Error Unkown' };
  }
}