import axios from 'axios';
import config from '../../config';
import cloud from '../../services/signatureServices.js';
import { useAuth } from '../../context/AuthContext.jsx'

const server = `${config.server}/users/`;

export const getAll = async () => {
  const { data } = await axios.get(server, {
    headers: {
      authorization: `Bearer ${useAuth}`
    }
  });

  return data.users;
}

export const get = async ({ id }) => {
  const { data } = await axios.get(`${server}${id}`)

  return data.user;
} 

export const create = async ( formData ) => {
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

  await axios.post(`${server}store`, formData);
}

export const edit = async ({ formData, id }) => {
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

    await axios.patch(`${server}${id}`, formData);
  } catch (err) {
    if (!axios.isAxiosError(err)) {
      throw new Error('Failed to update user data');
    }
    throw new Error(`Axios error: ${err.response?.data}`)
  }
}

export const destroy = async ({ id }) => {
  await axios.delete(`${server}${id}`);
}