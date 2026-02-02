import { useState } from 'react';
import { Form, useActionData } from 'react-router-dom';
import Joi from 'joi';

import RedirectLink from '@components/buttons/redirect/redirect';
import ErrorBox from '@components/errorBox/errorBox';
import { userSchema } from '@my-org/shared/validators';

const Login = () => {
  const actionData = useActionData();
  const { error: submitError } = actionData ?? {};

  const loginSchema = userSchema.fork(['password'], () => 
    Joi.string().required().messages({
      "string.empty": "Password is required"
    })
  );

  const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const usernameSchema = loginSchema.extract('username');
  const passwordSchema = loginSchema.extract('password');

  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const handleInput = (event, schema, setInput, setErrorMessage) => {
    setInput(event.target.value);
    const { error } = schema.validate(event.target.value);
    if (typeof error !== 'undefined') return setErrorMessage(error?.message);
    return setErrorMessage('');
  }

  const handleSubmit = () => {
    if (!usernameInput && !usernameErrorMessage) {
      const { error } = usernameSchema.validate(usernameInput);
      setUsernameErrorMessage(error?.message);
    }

    if (!passwordInput && !passwordErrorMessage) {
      const { error } = passwordSchema.validate(passwordInput);
      setPasswordErrorMessage(error?.message);
    }

    return;
  }

  return (
    <>
      <h1>Welcome back!</h1>
      <h6>Please enter your details</h6>
      <Form method="post">
        <div>
          <label htmlFor='username'>Username</label>
          <span className='validation-error'>{usernameErrorMessage}</span>
          <input 
            id='username'
            name='username'
            type='text' 
            autoComplete='username'
            value={usernameInput}
            onChange={(e) => handleInput(e, usernameSchema, setUsernameInput, setUsernameErrorMessage)}
          />
        </div>
        <div>
          <label htmlFor='password'>Username</label>
          <span className='validation-error'>{passwordErrorMessage}</span>
          <input 
            id='password'
            name='password'
            type='password' 
            autoComplete='current-password'
            value={passwordInput}
            onChange={(e) => handleInput(e, passwordSchema, setPasswordInput, setPasswordErrorMessage)}
          />
        </div>
        <button 
          type="submit" 
          className="btn"
          disabled={usernameErrorMessage || passwordErrorMessage}
          onClick={handleSubmit}
        >
          Login
        </button>
      </Form>
      {submitError 
        ? <ErrorBox>{submitError ?? null}</ErrorBox>
        : null
      }
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