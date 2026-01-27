import { useState, useEffect } from 'react';
import { useActionData, useOutletContext } from 'react-router-dom';

import TextInput from './text';
import OptionInput from './options';

const ValidatedInput = ({ id, label, type, schema, autoComplete, options, disabled }) => {
  const actionData = useActionData();
  const { validationError: submitValidationError } = actionData ?? '';

  const outletContext = useOutletContext();
  const { data } = outletContext ?? '';
  const value = data ? data?.[0]?.[`${id}`] : '';

  const [input, setInput] = useState(value ?? '');

  const [errorMessage, setErrorMessage] = useState('');
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    // 1. When the input has been written on
    // 2. When it's not filled yet and submit is done
    if (isFilled || (!isFilled && submitValidationError)) {
      const { error } = schema.validate(input);
      const { message } = error ?? '';
      setErrorMessage(message);
    }
  }, [submitValidationError, input, schema, isFilled])

  const handleInput = (event) => {
    setInput(event.target.value)

    if (!isFilled) {
      setIsFilled(true)
    }
  }

  return (options && options?.length > 0)
    ? <OptionInput
        key={id}
        id={id}
        label={label}
        type={type}
        options={options}
        disabled={disabled}
        errorMessage={errorMessage}
        handleInput={handleInput}
        isFilled={isFilled}
        value={value}
      />
    : <TextInput
        key={id}
        id={id}
        label={label}
        type={type}
        autoComplete={autoComplete ?? ''}
        disabled={disabled}
        errorMessage={errorMessage}
        handleInput={handleInput}
        isFilled={isFilled}
        value={value}
      />
}

export default ValidatedInput;