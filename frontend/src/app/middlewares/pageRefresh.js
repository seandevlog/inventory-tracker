import { redirect } from 'react-router-dom';
import axios from 'axios';
import config from '@config';
import { setToken, getToken } from '@stores/token.js';

const { server } = config;

const pageRefresh = async ({ request, context }, next) => {
  const url = new URL(request.url);
  const path = url.pathname;

  const accessToken = getToken();

  if (!accessToken) {
    // Get refresh token
    const { data } = await axios.get(`${server}${path}`, {
      headers: {
        authorization: `Bearer `, // Empty access token
      },
      withCredentials: true // For refresh token
    })

    const { success, accessToken } = data;

    // Cannot be refreshed, user retries login
    if (!success) return redirect('/') 
      
    setToken(accessToken); // for memory storage
  }
  
  context.accessToken = getToken(); // for atomicity

  return next();
}

export default pageRefresh;