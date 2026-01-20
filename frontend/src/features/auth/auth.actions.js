import { redirect } from 'react-router-dom';
import { 
  login as loginClient,
  register as registerClient
} from './auth.services';
import { setToken } from './auth.token';
import { userSchema } from '@shared/validators';

export const loginSubmit = async ({ request }) => {
  const formData = await request.formData();
  
  const { accessToken, error } = await loginClient(formData);
  setToken(accessToken);

  if (accessToken) {
    return redirect('/users');
  }

  if (error) {
    return { message: error };
  }
} 

export const registerSubmit = async ({ request }) => {
  const formData = await request.formData();

  const { error: validationError } = userSchema.validate(Object.fromEntries(formData));
  if (validationError) {
    return { validationError }; 
  }

  const { error } = await registerClient(formData);
  if (!error) {
    return redirect('/');
  }
}