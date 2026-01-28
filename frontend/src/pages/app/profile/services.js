import axios from 'axios';
import config from '@config';
import { setProfile } from '@stores/profile';

const { server } = config;

export const getProfile = async () => {
  const { data } = await axios.get(`${server}/profile`, {
    withCredentials: true
  })

  if (data?.success && data?.profile) {
    const { profile } = data;
    setProfile(profile);
    return profile;  
  }

  throw new Error('No Profile Data Found'); 
}