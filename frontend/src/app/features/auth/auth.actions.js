import { redirect } from 'react-router-dom';
import { 
  login as loginClient,
  register as registerClient
} from './auth.services';
import { setToken } from '@stores/token';
import { setUser } from '@stores/user';
import { userSchema } from '@my-org/shared/validators';

export const loginSubmit = async ({ request }) => {
  const formData = await request.formData();
  
  const { accessToken, error, user } = await loginClient(formData);
  setToken(accessToken);

  if (accessToken) {
    setUser({ user });
    return redirect('/dashboard');
  }

  if (error.status === 409) {
    return { message: error.response?.data?.error }
  }
} 

export const registerSubmit = async ({ request }) => {
  const formData = await request.formData();

  formData.append('isActive', 'active');
  
  const { error: validationError } = userSchema.validate(Object.fromEntries(formData));
  if (validationError) {
    return { validationError }; 
  }

  const { error } = await registerClient(formData);
  if (!error) {
    return redirect('/');
  }
}