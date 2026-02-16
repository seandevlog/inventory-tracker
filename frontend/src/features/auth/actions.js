import { redirect } from 'react-router-dom';
import { 
  login as loginClient,
  register as registerClient
} from './services';
import { setToken } from '@stores/token';

import config from '@config';
const { path } = config;

export const loginSubmit = async ({ request }) => {
  const formData = await request.formData();
  
  const { accessToken, error } = await loginClient(formData);
  setToken(accessToken);

  if (accessToken) return redirect(path.app.absolute);
  
  if (error) return { error };
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