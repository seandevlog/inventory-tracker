import { Form, useActionData } from 'react-router-dom';
import Joi from 'joi';

import RedirectLink from '@components/buttons/redirect/redirect';
import ErrorBox from '@components/errorBox/errorBox';
import { userSchema } from '@my-org/shared/validators';
import TextInput from '@components/validatedInput/text';

const Login = () => {
  const actionData = useActionData();
  const { message } = actionData || '';

  const loginSchema = userSchema.fork(['password'], () => 
    Joi.string().required().messages({
      "string.empty": "Password is required"
    })
  );

  return (
    <>
      <h1>Welcome back!</h1>
      <h6>Please enter your details</h6>
      <Form method="post">
        <TextInput 
          id='username'  
          label='Username'
          type='text'
          autoComplete='username'
          schema={loginSchema.extract('username')}
        />  
        <ValidatedInput 
          id='password' 
          label='Password'
          type='password'
          autoComplete='current-password'
          schema={loginSchema.extract('password')}
        />
        <button 
          type="submit" 
          className="btn"
        >
          Login
        </button>
      </Form>
      <ErrorBox className='login'>{message || ''}</ErrorBox>
      <RedirectLink 
        className="authRedirect" 
        url="/register"
      >
        I don't have an account
      </RedirectLink>
    </>
  )
}

export default Login;