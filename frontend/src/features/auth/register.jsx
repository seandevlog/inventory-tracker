import {
  useMemo,
  useReducer,
} from "react";
import {
  Form,
  useActionData,
  useNavigation,
  useOutletContext,
} from "react-router-dom";

import {
  userSchema,
} from "@my-org/shared/validators";

import ErrorBox from "@components/ui/errorBox/errorBox";
import RedirectLink from "@components/ui/redirect/redirect";

import userInputs from "@features/manage/users/inputs";

import config from "@config";

const { path } = config;

const excludedInputIds =
  new Set([
    "_id",
    "isActive",
    "role",
    "createdBy",
    "createdAt",
    "updatedAt",
  ]);

const filteredInputs =
  userInputs.filter(
    ({ id }) =>
      !excludedInputIds.has(id)
  );

const createInitialState = () =>
  Object.fromEntries(
    filteredInputs.map(
      ({ id }) => [
        id,
        {
          value: "",
          errorMessage: "",
        },
      ]
    )
  );

const formatLabel = (
  value
) =>
  String(value)
    .replace(
      /([a-z])([A-Z])/g,
      "$1 $2"
    )
    .replace(
      /^./,
      (character) =>
        character.toUpperCase()
    );

const getValidationMessage = (
  schema,
  value
) => {
  const { error } =
    schema.validate(value);

  return error?.message ?? "";
};

const reducer = (
  state,
  action
) => {
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

const Register = () => {
  const { classes } =
    useOutletContext();

  const actionData =
    useActionData();

  const navigation =
    useNavigation();

  const [formState, dispatch] =
    useReducer(
      reducer,
      undefined,
      createInitialState
    );

  const schemas = useMemo(
    () =>
      Object.fromEntries(
        filteredInputs.map(
          ({ id }) => [
            id,
            userSchema.extract(id),
          ]
        )
      ),
    []
  );

  const submitError =
    actionData?.error;

  const isSubmitting =
    navigation.state ===
    "submitting";

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

  const handleSubmit = (
    event
  ) => {
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

  return (
    <>
      <h1
        className={
          classes.heading
        }
      >
        Create an account
      </h1>

      <p
        className={
          classes.subtitle
        }
      >
        Enter your details to
        start managing your
        inventory.
      </p>

      <Form
        method="post"
        onSubmit={handleSubmit}
        className={classes.form}
        noValidate
      >
        {filteredInputs.map(
          ({
            id,
            type = "text",
            autoComplete,
            label,
          }) => {
            const field =
              formState[id];

            const displayLabel =
              label ??
              formatLabel(id);

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
              isSubmitting
            }
          >
            {isSubmitting
              ? "Creating account..."
              : "Register"}
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
            path.auth.absolute
          }
        >
          I already have an
          account
        </RedirectLink>
      </div>
    </>
  );
};

export default Register;