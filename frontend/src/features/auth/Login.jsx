import { Input, Redirect } from './auth.components';
import { Form, redirect } from 'react-router-dom';
import config from '../../../config/index.js';
import axios from 'axios';

export const action = async ({ request }) => {
  const formData = await request.formData();
  // const url = new URL(request.url);

  try {
    await axios.post(`${config.server}/auth/login`, formData);
  } catch (err) {
    console.log(err.response)
  }
  
  return redirect('/users');
} 

const Login = () => {
  return (
    <>
      <h1>Welcome back!</h1>
      <h6>Please enter your details</h6>
      <Form method="post">
        <Input 
          id="username"  
          type="text"
          autoComplete="username"
        >
          Username
        </Input>
        <Input 
          id="password" 
          type="password"
          autoComplete="current-password"
        >
          Password
        </Input>
        <button type="submit" className="btn">Login</button>
        <div className="error-box" id="error-box"></div>
      </Form>
      <Redirect url="/register">I don't have an account</Redirect>
    </>
  )
}

export default Login;