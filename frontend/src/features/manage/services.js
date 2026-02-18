import axios from 'axios';
import config from '@config';
import cloud from '@lib/cloud.js';
import { 
  postWithErrorHandling,
  patchWithErrorHandling,
  deleteWithErrorHandling
} from '@utils/api/withErrorHandling';

const server = `${config.server}/`;

export const getAll = async ({ accessToken, path }) => {
  const { data } = await axios.get(`${server}${path}`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true
  });

  return data;
}

export const get = async ({ id, accessToken, path }) => {
  const { data } = await axios.get(`${server}${path}/${id}`, {
    headers: {
      authorization: `Bearer ${accessToken}`
    },
    withCredentials: true
  })

  return data;
} 

export const create = async ({ formData, accessToken, path }) => {
  const feature = formData.get('feature');
  const featureData = 
    (feature instanceof File && feature.size > 0) 
    ? await cloud.uploadImageSigned(feature) 
    : null;
  if (featureData) {
    formData.delete('feature');

    formData.append('feature[url]', featureData.secure_url);
    formData.append('feature[public_id]', featureData.public_id);
    formData.append('feature[path]', `${path}/feature`)
  }

  return await postWithErrorHandling({ url: `${server}${path}/store`, formData, accessToken});
}

export const update = async ({ formData, id, accessToken, path }) => {
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

  return await patchWithErrorHandling({ url: `${server}${path}/${id}`, formData, accessToken});
}

export const destroy = async ({ id, accessToken, path }) => {
  return await deleteWithErrorHandling({ url: `${server}${path}/${id}`, accessToken });
}

export default {
  get,
  getAll,
  create,
  update,
  destroy
}