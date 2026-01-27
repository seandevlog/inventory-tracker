import axios from 'axios';
import config from '@config';
import { setProfile } from '@stores/profile';

const { server } = config;

export const getProfile = async ({ accessToken }) => {
  const res = await axios.get(`${server}/profile`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    withCredentials: true
  })

  if (res.success && res.profile) {
    const { profile } = res;
    setProfile(profile);
    return profile;  
  }

  throw new Error('No Profile Data Found'); 
}