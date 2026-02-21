import { useContext, useEffect, useReducer, useState } from "react";
import {
  Form,
  useActionData,
  useFetcher,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import Joi from "joi";

import AppContext from "@contexts/app.context";
import ErrorBox from "@components/errorBox/errorBox";
import RedirectLink from "@components/redirect/redirect";
import { userSchema } from "@my-org/shared/validators";

import config from "@config";
const { path } = config;

const inputReducer = {};
const inputs = [
  { id: "username", type: "text", autoComplete: "username" },
  { id: "password", type: "password", autoComplete: "password" },
];

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

const Login = () => {
  const { classes } = useOutletContext();

  const navigate = useNavigate();
  const actionData = useActionData();
  const { accessToken, error: submitError } = actionData ?? {};
  const fetcher = useFetcher();
  const { accessToken: accessTokenDemo } = fetcher.data ?? {};

  const { bumpTokenRefresh, bumpProfileRefresh } = useContext(AppContext);

  const [focused, setFocused] = useState(null);

  useEffect(() => {
    if (accessToken || accessTokenDemo) {
      bumpTokenRefresh();
      bumpProfileRefresh();
      navigate(path.root);
    }
  }, [accessToken, accessTokenDemo, navigate]);

  const loginSchema = userSchema.fork(["password"], () =>
    Joi.string().required().messages({
      "string.empty": "Password is required",
    })
  );

  inputs.map(
    ({ id }) =>
      (inputReducer[id] = useReducer(reducer, {
        errorMessage: "",
        input: "",
        schema: loginSchema.extract(id),
      }))
  );

  const handleClick = () => {
    inputs.map(({ id }) => {
      if (!inputReducer[id][0].input && !inputReducer[id][0].errorMessage) {
        inputReducer[id][1]({ value: inputReducer[id][0].input });
      }
    });
    return;
  };

  const handleDemo = () => {
    const formData = new FormData();
    formData.append("username", "test");
    formData.append("password", "!Password123");

    fetcher.submit(formData, { method: "post" });
  };

  return (
    <>
      <h1>Welcome back!</h1>
      <h6>Please enter your details</h6>

      <Form method="post">
        {inputs.map(({ id, type, autoComplete }) => {
          const state = inputReducer[id][0];
          const dispatch = inputReducer[id][1];
          const isActive = focused === id || !!state?.input;

          return (
            <div
              key={id}
              className={`${classes.inputWrapper} ${
                isActive ? classes.active : ''
              }`}
            >
              <input
                id={id}
                name={id}
                type={type}
                autoComplete={autoComplete}
                value={state?.input ?? ""}
                onChange={(e) => dispatch({ value: e.target.value })}
                onFocus={() => setFocused(id)}
                onBlur={() => setFocused(null)}
                required
              />

              <label htmlFor={id}>Enter your {id}</label>

              <span>{state?.errorMessage}</span>
            </div>
          );
        })}

        {submitError ? <ErrorBox>{submitError}</ErrorBox> : null}

        <button type="submit" onClick={handleClick}>
          Login
        </button>

        <button type="button" onClick={handleDemo}>
          Demo Login
        </button>
      </Form>

      <RedirectLink url={path.register.absolute}>
        Create an account
      </RedirectLink>
    </>
  );
};

export default Login;