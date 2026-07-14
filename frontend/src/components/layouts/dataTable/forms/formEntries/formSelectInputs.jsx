import splitUppercase from '@utils/splitUppercase';
import firstCharUppercase from '@utils/firstCharUppercase';

import { ArrowDown } from '@assets/arrows';

const FormSelectInputs = ({
  inputs, values, errors, onChange, mode, singleData, styles
}) => {
  const hasOptions = inputs.some(input => input.options?.length);
  if (!hasOptions) return null;

  return (
    <div className={styles.option}>
      {inputs.map(({ id, type, label, disabled, options }) => {
        if (!options?.length || disabled) return null;

        const value =
          mode === 'edit'
            ? (values?.[id] || singleData?.[id] || '')
            : (values?.[id] ?? '');

        return (
          <div key={id} className={styles.selectInput}>
            <select
              id={id}
              name={id}
              type={type}
              autoComplete="off"
              value={value}
              onChange={(e) => onChange(id, e.target.value)}
            >
              <option value="" disabled style={mode === 'create' ? {fontWeight: 'bolder'}: undefined}>
                {label}
              </option>

              {mode === 'create' && (
                <option value=''>--Leave Empty--</option>
              )}

              {options.map(opt => (
                <option key={opt} value={opt}>
                  {splitUppercase(firstCharUppercase(opt))}
                </option>
              ))}
            </select>

            <span><ArrowDown/></span>

            <span className={styles.validationError}>
              {errors?.[id] ? splitUppercase(firstCharUppercase(errors[id])) : ''}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default FormSelectInputs;