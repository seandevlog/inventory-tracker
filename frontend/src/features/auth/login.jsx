import {
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import {
  Form,
  useActionData,
  useFetcher,
  useNavigate,
  useNavigation,
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
    label: "Username",
    type: "text",
    autoComplete: "username",
  },
  {
    id: "password",
    label: "Password",
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

const getValidationMessage = (
  schema,
  value
) => {
  const { error } = schema.validate(value);

  return error?.message ?? "";
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT": {
      const {
        id,
        value,
        schema,
      } = action;

      return {
        ...state,
        [id]: {
          value,
          errorMessage:
            getValidationMessage(
              schema,
              value
            ),
        },
      };
    }

    case "VALIDATE_ALL": {
      return Object.fromEntries(
        Object.entries(state).map(
          ([id, field]) => [
            id,
            {
              ...field,
              errorMessage:
                getValidationMessage(
                  action.schemas[id],
                  field.value
                ),
            },
          ]
        )
      );
    }

    default:
      return state;
  }
};

const Login = () => {
  const { classes } = useOutletContext();

  const navigate = useNavigate();
  const navigation = useNavigation();
  const actionData = useActionData();
  const fetcher = useFetcher();

  const {
    bumpTokenRefresh,
    bumpProfileRefresh,
  } = useContext(AppContext);

  const [formState, dispatch] =
    useReducer(
      reducer,
      initialState
    );

  const loginSchema = useMemo(
    () =>
      userSchema.fork(
        ["password"],
        () =>
          Joi.string()
            .required()
            .messages({
              "string.empty":
                "Password is required",
              "any.required":
                "Password is required",
            })
      ),
    []
  );

  const schemas = useMemo(
    () => ({
      username:
        loginSchema.extract(
          "username"
        ),
      password:
        loginSchema.extract(
          "password"
        ),
    }),
    [loginSchema]
  );

  const accessToken =
    actionData?.accessToken;

  const demoAccessToken =
    fetcher.data?.accessToken;

  const submitError =
    actionData?.error ??
    fetcher.data?.error;

  const isSubmitting =
    navigation.state ===
    "submitting";

  const isDemoSubmitting =
    fetcher.state !== "idle";

  useEffect(() => {
    if (
      !accessToken &&
      !demoAccessToken
    ) {
      return;
    }

    bumpTokenRefresh();
    bumpProfileRefresh();

    navigate(path.root, {
      replace: true,
    });
  }, [
    accessToken,
    demoAccessToken,
    bumpTokenRefresh,
    bumpProfileRefresh,
    navigate,
  ]);

  const handleChange = (
    id,
    value
  ) => {
    dispatch({
      type: "CHANGE_INPUT",
      id,
      value,
      schema: schemas[id],
    });
  };

  const handleSubmit = (event) => {
    const hasErrors =
      Object.entries(
        formState
      ).some(([id, field]) =>
        Boolean(
          schemas[id].validate(
            field.value
          ).error
        )
      );

    dispatch({
      type: "VALIDATE_ALL",
      schemas,
    });

    if (hasErrors) {
      event.preventDefault();
    }
  };

  const handleDemo = () => {
    const formData =
      new FormData();

    formData.append(
      "username",
      "test"
    );

    formData.append(
      "password",
      "!Password123"
    );

    fetcher.submit(
      formData,
      {
        method: "post",
      }
    );
  };

  return (
    <>
      <h1
        className={
          classes.heading
        }
      >
        Welcome back
      </h1>

      <p
        className={
          classes.subtitle
        }
      >
        Enter your details to
        access your inventory.
      </p>

      <Form
        method="post"
        onSubmit={handleSubmit}
        className={classes.form}
        noValidate
      >
        {inputs.map(
          ({
            id,
            label,
            type,
            autoComplete,
          }) => {
            const field =
              formState[id];

            const errorId =
              `${id}-error`;

            return (
              <div className={classes.inputWrapper}>
                <div className={classes.inputControl}>
                  <input
                    id={id}
                    name={id}
                    type={type}
                    autoComplete={autoComplete}
                    value={field.value}
                    placeholder=" "
                    onChange={(event) =>
                      handleChange(id, event.target.value)
                    }
                    aria-invalid={Boolean(
                      field.errorMessage
                    )}
                    aria-describedby={errorId}
                  />

                  <label htmlFor={id}>
                    {label}
                  </label>
                </div>

                <span
                  id={errorId}
                  className={classes.inputError}
                  role={
                    field.errorMessage
                      ? "alert"
                      : undefined
                  }
                >
                  {field.errorMessage}
                </span>
              </div>
            );
          }
        )}

        {submitError && (
          <div
            className={
              classes.formError
            }
          >
            <ErrorBox>
              {submitError}
            </ErrorBox>
          </div>
        )}

        <div
          className={
            classes.buttonStack
          }
        >
          <button
            type="submit"
            className={
              classes.primaryButton
            }
            disabled={
              isSubmitting ||
              isDemoSubmitting
            }
          >
            {isSubmitting
              ? "Logging in..."
              : "Login"}
          </button>

          <button
            type="button"
            className={
              classes.secondaryButton
            }
            onClick={handleDemo}
            disabled={
              isSubmitting ||
              isDemoSubmitting
            }
          >
            {isDemoSubmitting
              ? "Opening demo..."
              : "Demo login"}
          </button>
        </div>
      </Form>

      <div
        className={
          classes.switchLink
        }
      >
        <RedirectLink
          url={
            path.register
              .absolute
          }
        >
          Create an account
        </RedirectLink>
      </div>
    </>
  );
};

export default Login;