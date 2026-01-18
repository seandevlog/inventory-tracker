import { redirect } from 'react-router-dom';
import { 
  login as loginUser,
  create as createUser
} from './auth.services';
import { setToken } from './auth.token';

export const loginSubmit = async ({ request }) => {
  const formData = await request.formData();
  const data = await loginUser(formData);
  const { accessToken } = data;
  setToken(accessToken);

  return redirect('/users');
} 

export const registerSubmit = async ({ request }) => {
  const formData = await request.formData();
  await createUser(formData);

  return redirect('/login');
}