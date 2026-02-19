import { useContext, useEffect, useReducer } from 'react';
import { Form, useActionData, useFetcher, useNavigate } from 'react-router-dom';
import Joi from 'joi';

import AppContext from '@contexts/app.context';

import ErrorBox from '@components/errorBox/errorBox';
import { userSchema } from '@my-org/shared/validators';

import config from '@config';
const { path } = config;

const inputReducer = {};
const inputs = [
  { id: 'username', type: 'text', autoComplete: 'username' },
  { id: 'password', type: 'password', autoComplete: 'password'}
];

const reducer = (state, action) => {
  const { error } = state.schema.validate(action.value)
  if (typeof error !== 'undefined') return {
    ...state,
    input: action.value,
    errorMessage: error?.message
  }
  return {
    ...state,
    input: action.value,
    errorMessage: ''
  }
}

const Login = () => {
  const navigate = useNavigate();
  const actionData = useActionData();
  const { accessToken, error: submitError } = actionData ?? {};
  const fetcher = useFetcher();
  const { accessToken : accessTokenDemo} = fetcher.data ?? {};

  const {
    bumpTokenRefresh,
    bumpProfileRefresh
  } = useContext(AppContext);

  useEffect(() => {
    if (accessToken || accessTokenDemo) {
      bumpTokenRefresh();
      bumpProfileRefresh();
      navigate(path.root);
    } 
  }, [accessToken, accessTokenDemo])

  const loginSchema = userSchema.fork(['password'], () => 
    Joi.string().required().messages({
      "string.empty": "Password is required"
    })
  );

  inputs.map(({id}) => inputReducer[id] = useReducer(reducer, {
    errorMessage: '', input: '', schema: loginSchema.extract(id)
  }))

  const handleInput = (event, dispatch) => {
    dispatch({ value: event.target.value })
  }

  const handleClick = () => {
    inputs.map(({id}) => {
      if (!inputReducer[id][0].input && !inputReducer[id][0].errorMessage) {
        inputReducer[id][1]({ value: inputReducer[id][0].input })
      }
    })

    return;
  }

  const handleDemo = () => {
    const formData = new FormData();
    formData.append("username", "test");
    formData.append("password", "!Password123");

    fetcher.submit(formData, {
      method: "post"
    });
  }

  return (
    <>
      <h1>Welcome back!</h1>
      <h6>Please enter your details</h6>
      <Form method="post">
        {inputs.map(({id, type, autoComplete}) => (
          <div key={id}>
            <input 
              id={id}
              name={id}
              type={type} 
              autoComplete={autoComplete}
              value={inputReducer[id][0]?.input ?? ''}
              onChange={(e) => handleInput(e, inputReducer[id][1])}
              required
            />
            <label htmlFor={id}>Enter your {id}</label>
            <span>{inputReducer[id][0]?.errorMessage}</span>
          </div>
        ))}
        <button 
          type="submit" 
          disabled={inputs.reduce((acc, {id}) => acc || inputReducer[id]?.[0]?.errorMessage, false)} // Checks; all values are false --> false OR one value is true --> true
          onClick={handleClick}
        >
          Login
        </button>
        {/* Demo */}
        <button 
          type="button" 
          onClick={handleDemo}
        >
          Demo Login
        </button>
      </Form>
      {submitError 
        ? <ErrorBox>{submitError}</ErrorBox>
        : null
      }
      <a 
        href={path.register.absolute}
      >
        I don't have an account
      </a>
    </>
  )
}

export default Login;