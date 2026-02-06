import { useReducer, useMemo, useContext } from 'react';
import { 
  Form,
  useActionData, 
  useOutletContext
} from 'react-router-dom';
import ImageUpload from '@components/imageUpload/imageUpload';
import ErrorBox from '@components/errorBox/errorBox';
import ErrorCircle from '@assets/errorCircle.svg';
import styles from './form.module.css';
import firstCharUppercase from '@utils/firstCharUppercase';
import AppContext from '@contexts/app.context';
import MainContext from '@contexts/main.context';

const inputReducer = {};

const reducer = (state, action) => {
  const { error } = state.schema.validate(action.value)
  if (typeof error !== 'undefined') return {
    ...state,
    input: action.value,
    errorMessage: error?.message
  }
  return {
    ...state,
    input: action.value,
    errorMessage: ''
  }
}

const FormCreate = () => {
  const { profile } = useContext(AppContext);
  const { role } = profile || {};
  const { id: manageFeature } = useContext(MainContext);

  const {
    FeaturePlaceholder,
    inputs,
    schema
  } = useOutletContext();
  const actionData = useActionData();
  const { error: submitError } = actionData || {};

  const filteredInputs = useMemo(() => 
    inputs.filter(({ disabled }) => 
      !disabled
    )
  ,[inputs])

  filteredInputs.map(({id, defaultValue}) =>
    inputReducer[id] = useReducer(reducer, {
      errorMessage: '', input: defaultValue ?? '', schema: schema.extract(id)
    })
  )

  const handleInput = (event, dispatch) => {
    dispatch({ value: event.target.value })
  }

  const handleClick = () => {
    filteredInputs.map(({id}) => {
      if (!inputReducer[id][0].input && !inputReducer[id][0].errorMessage) {
        inputReducer[id][1]({ value: inputReducer[id][0].input })
      }
    })

    return;
  }

  return (role && 
        ((role === 'staff' && 
          (manageFeature !== 'item' && manageFeature !== 'location' && manageFeature !== 'supplier')) ||
        role !== 'staff')
    ? <Form
      method="post"
      encType="multipart/form-data"
    >
      <ImageUpload 
        ImagePlaceholder={FeaturePlaceholder}
      />
      <fieldset className={styles.form}>
        <legend></legend>
        <div>
          <div className={styles.text}>
            {filteredInputs.map(({id, type, autoComplete, label, options}) => {
              return (
              (typeof options === 'undefined') &&
              <div key={id}>
                <label htmlFor={id}>{label}</label>
                {id !== 'createdBy'
                  ? <>
                      <span className='validation-error'>{inputReducer[id]?.[0]?.errorMessage}</span>
                      <input 
                        id={id}
                        name={id}
                        type={type} 
                        autoComplete={autoComplete}
                        value={inputReducer[id]?.[0]?.input ?? ''}
                        onChange={(e) => handleInput(e, inputReducer[id]?.[1])}
                      />
                    </>
                  : <input 
                      id={id}
                      name={id}
                      type={type} 
                      value={inputReducer[id]?.[0]?.input ?? ''}
                      readOnly
                    />
                }
              </div>
            )})}
          </div>
          <div className={styles.option}>
            {filteredInputs.map(({id, type, label, disabled, options}) => (
              options && options?.length > 0 && !disabled &&
              <div key={id}>
                <label htmlFor={id}>{label}</label>
                <select
                  id={id}
                  name={id}
                  type={type}
                  autoComplete='off'
                  value={inputReducer[id][0]?.input ?? ''}
                  onChange={(e) => handleInput(e, inputReducer[id][1])}
                >
                  <option value=''>--Choose One--</option>
                  {options.map(option => 
                    <option key={option} value={option}>
                      {firstCharUppercase(option)}
                    </option>
                  )}
                </select>
                {inputReducer[id][0]?.errorMessage &&
                  <ErrorCircle />
                }
              </div>
            ))}
          </div>
          {submitError 
            ? <ErrorBox className={styles.ErrorBox}>{submitError}</ErrorBox>
            : null
          }
        </div>
      </fieldset>
      <div>
        <button 
          type="submit" 
          className="btn"
          disabled={filteredInputs.reduce((acc, {id}) => acc || inputReducer[id]?.[0]?.errorMessage, false)} // Checks; all values are false --> false OR one value is true --> true
          onClick={handleClick}
        >
          Save
        </button>
      </div>
    </Form>
    : <div>This action needs a manager (or someone who looks important)</div>
  )
}

export default FormCreate;