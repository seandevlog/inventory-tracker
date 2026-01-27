import { redirect } from 'react-router-dom';
import axios from 'axios';
import config from '@config';
import { setToken } from '@stores/token.js';

const { server } = config;

// Authenticated and authorized
const isAuthed = async ({ context }, next) => {
  const { data } = await axios.get(`${server}/auth/refresh`, {
    withCredentials: true // For refresh token
  })

  const { success, accessToken } = data;

  if (!success) return redirect('/') 
      
  setToken(accessToken);
  context.accessToken = accessToken;
  
  return next();
}

export default isAuthed;