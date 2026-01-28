import axios from 'axios';
import config from '@config';
import cloud from '@lib/cloud.js';
import { postWith409Handling } from '@api/postWith409Handling';

const server = `${config.server}/items/`;

export const getAll = async ({ accessToken }) => {
  const { data } = await axios.get(server, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true
  });

  return data;
}

export const get = async ({ id, accessToken }) => {
  const { data } = await axios.get(`${server}${id}`, {
    headers: {
      authorization: `Bearer ${accessToken}`
    },
    withCredentials: true
  })

  return data;
} 

export const create = async ({ formData, accessToken }) => {
  const feature = formData.get('feature');
  const featureData = 
    (feature instanceof File && feature.size > 0) 
    ? await cloud.uploadImageSigned(feature) 
    : null;
  if (featureData) {
    formData.delete('feature');

    formData.append('feature[url]', featureData.secure_url);
    formData.append('feature[public_id]', featureData.public_id);
    formData.append('feature[path]', 'items/feature')
  }

  return await postWith409Handling({ url: `${server}store`, formData, accessToken});
}

export const edit = async ({ formData, id, accessToken }) => {
  const feature = formData.get('feature');
  if (feature instanceof File && feature.size > 0) {
    const public_id = formData.get('public_id');
    const featureData = public_id 
      ? await cloud.replaceImageSigned(feature, public_id) 
      : await cloud.uploadImageSigned(feature);
    
    if (featureData) {
      formData.delete('feature');

      formData.append('feature[url]', featureData.secure_url);
      formData.append('feature[public_id]', featureData.public_id);
    }
  } 

  return await postWith409Handling({ url: `${server}${id}`, formData, accessToken});
}

export const destroy = async ({ id, accessToken }) => {
  const { data } = await axios.delete(`${server}${id}`, {
    headers: {
      authorization: `Bearer ${accessToken}`
    },
    withCredentials: true
  });

  return data;
}