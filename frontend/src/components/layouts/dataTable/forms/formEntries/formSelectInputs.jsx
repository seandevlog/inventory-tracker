import splitUppercase from "@utils/splitUppercase";
import firstCharUppercase from "@utils/firstCharUppercase";

import { ArrowDown } from "@assets/arrows";

const FormSelectInputs = ({
  inputs,
  values,
  errors,
  onChange,
  mode,
  singleData,
  styles,
}) => {
  const selectInputs = (inputs ?? []).filter(
    ({ options, disabled }) =>
      options?.length && !disabled
  );

  if (selectInputs.length === 0) return null;

  return (
    <div className={styles.option}>
      {selectInputs.map(
        ({ id, label, options }) => {
          const value =
            values?.[id] ??
            (mode === "edit"
              ? singleData?.[id] ?? ""
              : "");

          const errorId = `${id}-error`;

          return (
            <div
              key={id}
              className={styles.selectInput}
            >
              <label
                htmlFor={id}
                className={styles.selectLabel}
              >
                {label}
              </label>

              <div className={styles.selectControl}>
                <select
                  id={id}
                  name={id}
                  autoComplete="off"
                  value={value}
                  onChange={(event) =>
                    onChange(id, event.target.value)
                  }
                  aria-invalid={!!errors?.[id]}
                  aria-describedby={
                    errors?.[id]
                      ? errorId
                      : undefined
                  }
                >
                  <option value="">
                    Select {label}
                  </option>

                  {options.map((option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {splitUppercase(
                        firstCharUppercase(
                          String(option)
                        )
                      )}
                    </option>
                  ))}
                </select>

                <span
                  className={styles.selectArrow}
                  aria-hidden="true"
                >
                  <ArrowDown />
                </span>
              </div>

              <span
                id={errorId}
                className={styles.validationError}
                role={
                  errors?.[id] ? "alert" : undefined
                }
              >
                {errors?.[id]
                  ? splitUppercase(
                      firstCharUppercase(
                        errors[id]
                      )
                    )
                  : ""}
              </span>
            </div>
          );
        }
      )}
    </div>
  );
};

export default FormSelectInputs;