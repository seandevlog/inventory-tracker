import { redirect } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import { create as createUser } from './auth.services';

export const loginSubmit = async ({ request }) => {
  const formData = await request.formData();
  await axios.post(`${config.server}/auth/login`, formData);

  return redirect('/users');
} 

export const registerSubmit = async ({ request }) => {
  const formData = await request.formData();
  await createUser(formData);

  return redirect('/login');
}