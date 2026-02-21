import { redirect } from 'react-router-dom';
import { 
  login as loginClient,
  register as registerClient,
  logout as logoutClient
} from './services';
import { setToken } from '@stores/token';

import config from '@config';
const { path } = config;

export const loginSubmit = async ({ request }) => {
  const formData = await request.formData();
  
  const { data, error } = await loginClient(formData);
  const { accessToken } = data ?? {};
  setToken(accessToken);

  if (accessToken) return { accessToken, error: null };
  
  if (error) return { accessToken: null, error };
} 

export const registerSubmit = async ({ request }) => {
  const formData = await request.formData();

  formData.append('isActive', 'active');
  formData.append('role', 'staff')
  formData.append('createdBy', null)

  const { error } = await registerClient(formData);

  if (error) return { error };

  return redirect(path.auth.absolute);
}

export const logoutSubmit = async () => {
  const { success, error } = await logoutClient();

  if (error) throw error;
  
  if (success) return { success };
}