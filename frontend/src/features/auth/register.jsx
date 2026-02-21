import { useReducer, useState } from "react";
import { Form, useActionData, useOutletContext } from "react-router-dom";
import { userSchema } from "@my-org/shared/validators";

import ErrorBox from "@components/errorBox/errorBox";
import RedirectLink from "@components/redirect/redirect";

import userInputs from "@features/manage/users/inputs";

import config from "@config";
const { path } = config;

const inputReducer = {};
const filteredInputs = userInputs.filter(
  ({ id }) =>
    id !== "isActive" &&
    id !== "role" &&
    id !== "createdAt" &&
    id !== "updatedAt"
);

const reducer = (state, action) => {
  const { error } = state.schema.validate(action.value);
  if (typeof error !== "undefined")
    return {
      ...state,
      input: action.value,
      errorMessage: error?.message,
    };
  return {
    ...state,
    input: action.value,
    errorMessage: "",
  };
};

const Register = () => {
  const { classes } = useOutletContext();

  const actionData = useActionData();
  const { error: submitError } = actionData ?? {};

  const [focused, setFocused] = useState(null);

  filteredInputs.map(
    ({ id }) =>
      (inputReducer[id] = useReducer(reducer, {
        errorMessage: "",
        input: "",
        schema: userSchema.extract(id),
      }))
  );

  const handleInput = (event, dispatch) => {
    dispatch({ value: event.target.value });
  };

  const handleClick = () => {
    filteredInputs.map(({ id }) => {
      if (!inputReducer[id][0].input && !inputReducer[id][0].errorMessage) {
        inputReducer[id][1]({ value: inputReducer[id][0].input });
      }
    });
    return;
  };

  return (
    <>
      <h1>Who are you?</h1>
      <h6>Please enter your details</h6>

      <Form method="post">
        {filteredInputs.map(({ id, type, autoComplete, label }) => {
          const state = inputReducer[id][0];
          const dispatch = inputReducer[id][1];
          const isActive = focused === id || !!state?.input;

          return (
            <div
              key={id}
              className={`${classes.inputWrapper} ${
                isActive ? classes.active : ""
              }`}
            >
              <input
                id={id}
                name={id}
                type={type}
                autoComplete={autoComplete}
                value={state?.input ?? ""}
                onChange={(e) => handleInput(e, dispatch)}
                onFocus={() => setFocused(id)}
                onBlur={() => setFocused(null)}
                required
              />

              <label htmlFor={id}>Enter {label}</label>

              <span>{state?.errorMessage}</span>
            </div>
          );
        })}

        {submitError ? <ErrorBox>{submitError}</ErrorBox> : null}

        <button type="submit" onClick={handleClick}>
          Register
        </button>
      </Form>

      <RedirectLink url={path.auth.absolute}>
        I already have an account
      </RedirectLink>
    </>
  );
};

export default Register;