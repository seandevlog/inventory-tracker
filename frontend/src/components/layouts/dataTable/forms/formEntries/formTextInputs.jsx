const FormTextInputs = ({
  inputs,
  values,
  errors,
  onChange,
  mode,
  singleData,
  styles,
}) => {
  const textInputs = (inputs ?? []).filter(
    ({ id, type, options }) =>
      !options?.length &&
      id !== "createdBy" &&
      type !== "date" &&
      !(mode !== "create" && type === "password")
  );

  return (
    <div className={styles.textInputs}>
      {textInputs.map(
        ({
          id,
          type,
          autoComplete,
          label,
        }) => {
          const value =
            values?.[id] ??
            (mode === "edit"
              ? singleData?.[id] ?? ""
              : "");

          const errorId = `${id}-error`;

          return (
            <div
              key={id}
              className={styles.input}
            >
              <label htmlFor={id}>
                {label}
              </label>

              <input
                id={id}
                name={id}
                type={type}
                autoComplete={autoComplete}
                value={value}
                placeholder={
                  mode === "create"
                    ? `Enter ${label}`
                    : undefined
                }
                onChange={(event) =>
                  onChange(id, event.target.value)
                }
                aria-invalid={!!errors?.[id]}
                aria-describedby={
                  errors?.[id]
                    ? errorId
                    : undefined
                }
              />

              <span
                id={errorId}
                className={styles.validationError}
                role={
                  errors?.[id] ? "alert" : undefined
                }
              >
                {errors?.[id] ?? ""}
              </span>
            </div>
          );
        }
      )}
    </div>
  );
};

export default FormTextInputs;