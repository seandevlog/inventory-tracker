import { useContext, useEffect, useMemo, useReducer, useState } from "react";
import {
  Form,
  useActionData,
  useFetcher,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import Joi from "joi";

import AppContext from "@contexts/app.context";
import ErrorBox from "@components/ui/errorBox/errorBox";
import RedirectLink from "@components/ui/redirect/redirect";
import { userSchema } from "@my-org/shared/validators";

import config from "@config";

const { path } = config;

const inputs = [
  {
    id: "username",
    type: "text",
    autoComplete: "username",
  },
  {
    id: "password",
    type: "password",
    autoComplete: "current-password",
  },
];

const initialState = {
  username: {
    value: "",
    errorMessage: "",
  },
  password: {
    value: "",
    errorMessage: "",
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT": {
      const { id, value, schema } = action;
      const { error } = schema.validate(value);

      return {
        ...state,
        [id]: {
          value,
          errorMessage: error?.message ?? "",
        },
      };
    }

    case "VALIDATE_ALL": {
      const { schemas } = action;

      return Object.fromEntries(
        Object.entries(state).map(([id, field]) => {
          const { error } = schemas[id].validate(field.value);

          return [
            id,
            {
              ...field,
              errorMessage: error?.message ?? "",
            },
          ];
        })
      );
    }

    default:
      return state;
  }
};

const Login = () => {
  const { classes } = useOutletContext();

  const navigate = useNavigate();
  const actionData = useActionData();
  const fetcher = useFetcher();

  const { accessToken, error: submitError } = actionData ?? {};
  const { accessToken: accessTokenDemo } = fetcher.data ?? {};

  const { bumpTokenRefresh, bumpProfileRefresh } =
    useContext(AppContext);

  const [focused, setFocused] = useState(null);
  const [formState, dispatch] = useReducer(reducer, initialState);

  const loginSchema = useMemo(
    () =>
      userSchema.fork(["password"], () =>
        Joi.string().required().messages({
          "string.empty": "Password is required",
          "any.required": "Password is required",
        })
      ),
    []
  );

  const schemas = useMemo(
    () => ({
      username: loginSchema.extract("username"),
      password: loginSchema.extract("password"),
    }),
    [loginSchema]
  );

  useEffect(() => {
    if (!accessToken && !accessTokenDemo) return;

    bumpTokenRefresh();
    bumpProfileRefresh();
    navigate(path.root);
  }, [
    accessToken,
    accessTokenDemo,
    bumpTokenRefresh,
    bumpProfileRefresh,
    navigate,
  ]);

  const handleChange = (id, value) => {
    dispatch({
      type: "CHANGE_INPUT",
      id,
      value,
      schema: schemas[id],
    });
  };

  const handleSubmit = (event) => {
    const hasErrors = Object.entries(formState).some(([id, field]) => {
      return schemas[id].validate(field.value).error;
    });

    if (hasErrors) {
      event.preventDefault();

      dispatch({
        type: "VALIDATE_ALL",
        schemas,
      });
    }
  };

  const handleDemo = () => {
    const formData = new FormData();

    formData.append("username", "test");
    formData.append("password", "!Password123");

    fetcher.submit(formData, {
      method: "post",
    });
  };

  return (
    <>
      <h1>Welcome back!</h1>
      <h6>Please enter your details</h6>

      <Form method="post" onSubmit={handleSubmit}>
        {inputs.map(({ id, type, autoComplete }) => {
          const field = formState[id];
          const isActive = focused === id || Boolean(field.value);

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
                value={field.value}
                onChange={(event) =>
                  handleChange(id, event.target.value)
                }
                onFocus={() => setFocused(id)}
                onBlur={() => setFocused(null)}
                required
              />

              <label htmlFor={id}>
                Enter your {id}
              </label>

              {field.errorMessage && (
                <span>{field.errorMessage}</span>
              )}
            </div>
          );
        })}

        {submitError && <ErrorBox>{submitError}</ErrorBox>}

        <button type="submit">
          Login
        </button>

        <button
          type="button"
          onClick={handleDemo}
          disabled={fetcher.state !== "idle"}
        >
          {fetcher.state === "idle"
            ? "Demo Login"
            : "Logging in..."}
        </button>
      </Form>

      <RedirectLink url={path.register.absolute}>
        Create an account
      </RedirectLink>
    </>
  );
};

export default Login;