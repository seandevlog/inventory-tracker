import { Form, redirect } from 'react-router-dom';
import axios from 'axios';

import config from '../../config';
import ValidatedInput from '../../components/ValidatedInput';
import RedirectLink from '../../components/RedirectLink/RedirectLink';
import ErrorBox from '../../components/ErrorBox';

export const action = async ({ request }) => {
  const formData = await request.formData();
  await axios.post(`${config.server}/auth/login`, formData);

  return redirect('/users');
} 

const Login = () => {
  return (
    <>
      <h1>Welcome back!</h1>
      <h6>Please enter your details</h6>
      <Form method="post">
        <ValidatedInput 
          id="username"  
          type="text"
          autoComplete="username"
        >
          Username
        </ValidatedInput>
        <ValidatedInput 
          id="password" 
          type="password"
          autoComplete="current-password"
        >
          Password
        </ValidatedInput>
        <button type="submit" className="btn">Login</button>
        <ErrorBox />
      </Form>
      <RedirectLink className="redirect" url="/register">I don't have an account</RedirectLink>
    </>
  )
}

export default Login;