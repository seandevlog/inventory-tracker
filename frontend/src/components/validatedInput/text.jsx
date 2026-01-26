import { 
  useState, 
  useEffect 
} from 'react';
import {
  useActionData,
  useOutletContext,
  useParams
} from 'react-router-dom';
import { filter } from 'lodash';
import styles from './text.module.css';

const TextInput = ({ id, label, type, autoComplete, schema, disabled }) => {
  const actionData = useActionData();
  const { validationError: submitValidationError } = actionData ?? '';

  const { data: groupData } = useOutletContext();
  const params = useParams();
  const paramId = params ? Object.values(params)?.[0] : '';
  const [ data ] = filter(groupData, { _id: paramId });
  const value = data ? data?.[`${id}`] : '';

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

  return (
    <div className={styles.text}>
      <label htmlFor={id}>{label}</label>
      {errorMessage &&
        <span id="validation-error">
          <p>{errorMessage}</p>
        </span>
      }
      <input 
        id={id}
        name={isFilled ? id : ''}
        type={type}
        onChange={handleInput}
        autoComplete={autoComplete.toString()} 
        defaultValue={value} 
        disabled={disabled}
      />
    </div>
  )
}

export default TextInput;