import { useReducer } from 'react';
import { Form, useActionData } from 'react-router-dom';
import Joi from 'joi';

import RedirectLink from '@components/buttons/redirect/redirect';
import ErrorBox from '@components/errorBox/errorBox';
import { userSchema } from '@my-org/shared/validators';
import firstCharUppercase from '@utils/firstCharUppercase';

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
  const actionData = useActionData();
  const { error: submitError } = actionData ?? {};

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

  return (
    <>
      <h1>Welcome back!</h1>
      <h6>Please enter your details</h6>
      <Form method="post">
        {inputs.map(({id, type, autoComplete}) => (
          <div key={id}>
            <label htmlFor={id}>{firstCharUppercase(id)}</label>
            <span className='validation-error'>{inputReducer[id][0]?.errorMessage}</span>
            <input 
              id={id}
              name={id}
              type={type} 
              autoComplete={autoComplete}
              value={inputReducer[id][0]?.input ?? ''}
              onChange={(e) => handleInput(e, inputReducer[id][1])}
            />
          </div>
        ))}
        <button 
          type="submit" 
          className="btn"
          disabled={inputs.reduce((acc, {id}) => acc || inputReducer[id]?.[0]?.errorMessage, false)} // Checks; all values are false --> false OR one value is true --> true
          onClick={handleClick}
        >
          Login
        </button>
      </Form>
      {submitError 
        ? <ErrorBox>{submitError}</ErrorBox>
        : null
      }
      <RedirectLink 
        url="/register"
      >
        I don't have an account
      </RedirectLink>
    </>
  )
}

export default Login;