import axios from 'axios';
import config from '../../config';
import cloud from '../../services/signatureServices.js';
import { getToken, setToken } from '../../features/auth/auth.token.js';

const server = `${config.server}/users/`;

export const getAll = async () => {
  let accessToken = getToken();
  try {
    // For page refreshes
    if (!accessToken) {
      const { data } = await axios.get(server, {
        headers: {
          authorization: `Bearer `, // Empty access token
        },
        withCredentials: true // For refresh token
      })

      if (data.success) {
        setToken(data.accessToken);
        accessToken = getToken();
      }
    } 

    const { data } = await axios.get(server, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true
    });

    return data;
  } catch (err) {
    if (!axios.isAxiosError(err)) {
      throw new Error('Failed to update user data');
    }
    if (err.response.status === 403) return { error: err.response.data };
    throw new Error(`Axios error: ${err.response?.data}`)
  }
}

export const get = async ({ id }) => {
  let accessToken = getToken();
  try {
    // For page refreshes
    if (!accessToken) {
      const { data } = await axios.get(`${server}${id}`, {
        headers: {
          authorization: `Bearer `, // Empty access token
        },
        withCredentials: true // For refresh token
      })

      if (data.success) {
        setToken(data.accessToken);
        accessToken = getToken();
      }
    } 

    const { data } = await axios.get(`${server}${id}`, {
      headers: {
        authorization: `Bearer ${accessToken}`
      },
      withCredentials: true
    })

    return data;
  } catch (err) {
    if (!axios.isAxiosError(err)) {
      throw new Error('Failed to update user data');
    }
    throw new Error(`Axios error: ${err.response?.data}`)
  }
  
} 

export const create = async ( formData ) => {
  let accessToken = getToken();
  try {
    const profile = formData.get('profile');
    const profileData = 
      (profile instanceof File && profile.size > 0) 
      ? await cloud.uploadImageSigned(profile) 
      : null;
    if (profileData) {
      formData.delete('profile');

      formData.append('profile[url]', profileData.secure_url);
      formData.append('profile[public_id]', profileData.public_id);
    }

    // For page refreshes
    if (!accessToken) {
      const { data } = await axios.post(`${server}store`, formData, {
        headers: {
          authorization: `Bearer `, // Empty access token
        },
        withCredentials: true // For refresh token
      })

      if (data.success) {
        setToken(data.accessToken);
        accessToken = getToken();
      }
    } 

    const { data } = await axios.post(`${server}store`, formData, {
      headers: {
        authorization: `Bearer ${accessToken}`
      },
      withCredentials: true
    });

    return data;
  } catch (err) {
    if (!axios.isAxiosError(err)) {
      throw new Error('Failed to update user data');
    }
    throw new Error(`Axios error: ${err.response?.data}`)
  }
}

export const edit = async ({ formData, id }) => {
  let accessToken = getToken();
  try {
    const profile = formData.get('profile');
    if (profile instanceof File && profile.size > 0) {
      const public_id = formData.get('public_id');
      const profileData = public_id 
        ? await cloud.replaceImageSigned(profile, public_id) 
        : await cloud.uploadImageSigned(profile);
      
      if (profileData) {
        formData.delete('profile');

        formData.append('profile[url]', profileData.secure_url);
        formData.append('profile[public_id]', profileData.public_id);
      }
    } 

    // For page refreshes
    if (!accessToken) {
      const { data } = await axios.patch(`${server}${id}`, formData, {
        headers: {
          authorization: `Bearer `, // Empty access token
        },
        withCredentials: true // For refresh token
      })

      if (data.success) {
        setToken(data.accessToken);
        accessToken = getToken();
      }
    }

    const { data } = await axios.patch(`${server}${id}`, formData, {
      headers: {
        authorization: `Bearer ${accessToken}`
      },
      withCredentials: true
    });
    return data;
  } catch (err) {
    if (!axios.isAxiosError(err)) {
      throw new Error('Failed to update user data');
    }
    throw new Error(`Axios error: ${err.response?.data}`)
  }
}

export const destroy = async ({ id }) => {
  let accessToken = getToken();
  try {
    // For page refreshes
    if (!accessToken) {
      const { data } = await axios.delete(`${server}${id}`, {
        headers: {
          authorization: `Bearer `, // Empty access token
        },
        withCredentials: true // For refresh token
      })

      if (data.success) {
        setToken(data.accessToken);
        accessToken = getToken();
      }
    } 

    const { data } = await axios.delete(`${server}${id}`, {
      headers: {
        authorization: `Bearer ${accessToken}`
      },
      withCredentials: true
    });

    return data;
  } catch (err) {
    if (!axios.isAxiosError(err)) {
      throw new Error('Failed to update user data');
    }
    throw new Error(`Axios error: ${err.response?.data}`)
  }
}