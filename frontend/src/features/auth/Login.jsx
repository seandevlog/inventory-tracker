import * as React from 'react';
import { Form, useActionData, useNavigate } from 'react-router-dom';
import Joi from 'joi';
import { ValidatedInput, RedirectLink, ErrorBox } from '../../components';
import { userSchema } from '@shared/validators';
import { AuthProvider } from '../../context/AuthContext';

const Login = () => {
  const actionData = useActionData();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    const { redirect } = actionData ?? {};
    if (redirect) navigate(redirect);
  }, [actionData, navigate])

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
        <ValidatedInput 
          id="username"  
          type="text"
          autoComplete="username"
          schema={loginSchema}
        >
          Username
        </ValidatedInput>
        <ValidatedInput 
          id="password" 
          type="password"
          autoComplete="current-password"
          schema={loginSchema}
        >
          Password
        </ValidatedInput>
        <button type="submit" className="btn">Login</button>
        <ErrorBox />
      </Form>
      <RedirectLink className="authRedirect" url="/register">I don't have an account</RedirectLink>
      <AuthProvider accessToken={actionData?.accessToken} />
    </>
  )
}

export default Login;