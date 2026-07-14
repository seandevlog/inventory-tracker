import { useState } from "react";

const FormTextInputs = ({
  inputs, values, errors, onChange, mode, singleData, styles
}) => {
  return (
    <>
      {inputs.map(({ id, type, autoComplete, label, options }) => {
        if (options) return null;
        if (id === 'createdBy') return null;
        if (type === 'date') return null;
        if (mode !== 'create' && type === 'password') return null;

        const value = values?.[id] ?? '';
        const placeholder = mode === 'edit' ? (singleData?.[id] ?? '') : undefined;

        return (
          <div key={id} className={styles.input}>
            {mode === 'edit' && <label htmlFor={id}>{label}</label>}
            <FormTextInput
              id={id}
              name={id}
              type={type}
              autoComplete={autoComplete}
              value={value}
              placeholder={placeholder}
              onChange={(e) => onChange(id, e.target.value)}
              label={label}
              styles={styles}
              mode={mode}
            />
            <span className={styles.validationError}>{errors?.[id]}</span>
          </div>
        )
      })}
    </>
  )
}

const FormTextInput = ({
  id, type, autoComplete, value, placeholder, onChange, mode, label, styles
}) => {
  const [isFocus, setIsFocus] = useState(false);
  
  return (
    <>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
      {mode === 'create' && (
        <span className={value || isFocus ? styles.floatPlaceholder : styles.placeholder}>
          {`Enter ${label}`}
        </span>
      )}
    </>
  )
}

export default FormTextInputs;