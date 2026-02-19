import { useReducer } from 'react';
import { Form, useActionData } from 'react-router-dom';
import { userSchema } from '@my-org/shared/validators';

import ErrorBox from '@components/errorBox/errorBox';

import userInputs from '@features/manage/users/inputs';

import config from '@config';
const { path } = config;

const inputReducer = {};
const filteredInputs = userInputs.filter(({ id }) => 
  id !== 'isActive' && id !== 'role' &&
  id !== 'createdAt' && id !== 'updatedAt'
); 

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

const Register = () => {
  const actionData = useActionData();
  const { error: submitError } = actionData ?? {};

  filteredInputs.map(({id}) => inputReducer[id] = useReducer(reducer, {
    errorMessage: '', input: '', schema: userSchema.extract(id)
  }))

  const handleInput = (event, dispatch) => {
    dispatch({ value: event.target.value })
  }

  const handleClick = () => {
    filteredInputs.map(({id}) => {
      if (!inputReducer[id][0].input && !inputReducer[id][0].errorMessage) {
        inputReducer[id][1]({ value: inputReducer[id][0].input })
      }
    })

    return;
  }

  return (
    <>
      <h1>Who are you?</h1>
      <h6>Please enter your details</h6>
      <Form method="post">
        {filteredInputs.map(({id, type, autoComplete, label}) => (
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
            <label htmlFor={id}>Enter {label}</label>
            <span>{inputReducer[id][0]?.errorMessage}</span>
          </div>
        ))}
        <button 
          type="submit" 
          className="btn"
          disabled={filteredInputs.reduce((acc, {id}) => acc || inputReducer[id]?.[0]?.errorMessage, false)} // Checks; all values are false --> false OR one value is true --> true
          onClick={handleClick}
        >
          Register
        </button>
      </Form>
      {submitError 
        ? <ErrorBox>{submitError}</ErrorBox>
        : null
      }
      <a 
        href={path.auth.absolute}
      >
        I already have an account
      </a>
    </>
  )
}

export default Register;