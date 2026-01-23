import axios from 'axios';
import config from '@config';
import cloud from '@lib/cloud.js';

const server = `${config.server}/users/`;

export const getAll = async ({ accessToken }) => {
  try {
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
    if (err.response.status === 403) {
      return { error: err.response.data };
    }
    throw new Error(`Axios error: ${err.response?.data}`)
  }
}

export const get = async ({ id, accessToken }) => {
  try {
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

export const create = async ({ formData, accessToken }) => {
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
      formData.append('profile[path]', 'users/profile_pics')
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

export const edit = async ({ formData, id, accessToken }) => {
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

export const destroy = async ({ id, accessToken }) => {
  try {
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