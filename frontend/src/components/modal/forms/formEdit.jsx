import { useReducer, useMemo, useContext } from 'react';
import { 
  Form,
  useActionData, 
  useOutletContext
} from 'react-router-dom';
import ImageUpload from '@components/imageUpload/imageUpload';
import ErrorBox from '@components/errorBox/errorBox';
import ErrorCircle from '@assets/errorCircle.svg';
import styles from './formEdit.module.css';
import firstCharUppercase from '@utils/firstCharUppercase'
import splitUppercase from '@utils/splitUppercase';
import AppContext from '@contexts/app.context';
import { ArrowDown } from '@assets/arrows';

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

const FormEdit = () => {
  const { profile } = useContext(AppContext);
  const { role, username } = profile || {};

  const actionData = useActionData()

  const {
    FeaturePlaceholder,
    inputs,
    schema,
    singleData
  } = useOutletContext();
  const error = actionData?.error ?? null;

  const filteredInputs = useMemo(() => 
    inputs.filter(({ disabled }) => 
      !disabled
    )
  ,[inputs]);

  const keys = useMemo(() => 
    schema._ids._byKey.keys().toArray()
  , [schema._ids._byKey])

  const optionalInputsSchema = useMemo(() => 
    schema.fork(keys, (field) => field.optional().allow(null, ''))
  , [schema, keys]);

  filteredInputs.map(({id, defaultValue}) => inputReducer[id] = useReducer(reducer, {
    errorMessage: '', input: defaultValue ?? '', schema: optionalInputsSchema.extract(id)
  }))

  const handleInput = (event, dispatch) => {
    dispatch({ value: event.target.value })
  }

  const handleClick = () => {
    filteredInputs.map(({id}) => {
      if (!inputReducer[id]?.[0].input && !inputReducer[id]?.[0].errorMessage) {
        inputReducer[id]?.[1]({ value: inputReducer[id]?.[0].input || singleData[0]?.[id]})
      }
    })

    return;
  }

  return (role && (role === 'admin' || role === 'manager') 
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
          <div>
            {inputs.map(({id, label}) => id === '_id' && (
              <div 
                key={id}
                className={styles.info}  
              >
                <span><p>{label}</p></span>
                <span id={id}><p>{singleData[0]?.[id]}</p></span>
              </div>
            ))}
          </div>
          <div className={styles.text}>
            {filteredInputs.map(({id, type, autoComplete, label, options}) => (
              (typeof options === 'undefined') 
              ? id !== 'createdBy'
                && <div
                  key={id}
                  className={styles.input}
                >
                  <label htmlFor={id}>{label}</label>
                  <input 
                    id={id}
                    name={id}
                    type={type} 
                    autoComplete={autoComplete}
                    value={inputReducer[id]?.[0]?.input || ''}
                    placeholder={singleData[0]?.[id]}
                    onChange={(e) => handleInput(e, inputReducer[id]?.[1])}
                  />
                  <span className={styles.validationError}>{inputReducer[id]?.[0]?.errorMessage}</span>
                </div>
              : null
            ))}
          </div>
          {filteredInputs.filter(input => (
            typeof input.options !== 'undefined'
          )).length > 0 &&
            <div className={styles.option}>
              {inputs.map(({id, type, label, disabled, options}) => (
                options && options?.length > 0 && !disabled &&
                <div 
                  key={id}
                  className={styles.selectInput}
                >
                  <select
                    id={id}
                    name={inputReducer[id]?.[0]?.input ? id: ''}
                    className={styles.selectInput}
                    type={type}
                    autoComplete='off'
                    value={inputReducer[id]?.[0]?.input || singleData[0]?.[id] || ''}
                    onChange={(e) => handleInput(e, inputReducer[id]?.[1])}
                  >
                    <option value='' disabled>{label}</option>
                    {options.map(option => 
                      <option key={option} value={option}>
                        {splitUppercase(firstCharUppercase(option))}
                      </option>
                    )}
                  </select>
                  <span><ArrowDown/></span>
                  {inputReducer[id]?.[0]?.errorMessage &&
                    <ErrorCircle />
                  }
                </div>
              ))}
            </div>
          }
          <div className={styles.createdBy}>
            <span><p>Created By</p></span>
            <input 
              id='createdBy'
              name='createdBy'
              value={username}
              readOnly
            />
          </div>
          <div className={styles.date}>
            {inputs.map(({id, type, label}) => (
              type === 'date' &&
              <div 
                key={id}
                className={styles.info}
              >
                <span><p>{label}</p></span>
                <span id={id}><p>{new Date(singleData[0]?.[id]).toLocaleDateString(undefined, {
                  weekday: 'long',
                  month: 'long',
                  day: '2-digit',
                  year: 'numeric',
                  minute: '2-digit',
                  hour: '2-digit'
                })}</p></span>
              </div>
            ))}
          </div>
        </div>
      </fieldset>
      <div className={styles.errorBox}>
        <ErrorBox>{error}</ErrorBox>
      </div>
      <div className={styles.button}>
        <button 
          type="submit"
          className="btn"
          name="intent"
          value='update'
          disabled={filteredInputs.reduce((acc, {id}) => acc || inputReducer[id]?.[0]?.errorMessage, false)} // Checks; all values are false --> false OR one value is true --> true
          onClick={handleClick}
        >
          Save
        </button>
        <button 
          type='submit' 
          className="btn"
          name='intent'
          value='delete'
        >
          Delete
        </button>
      </div>
    </Form>
    : <div>This action needs a manager (or someone who looks important)</div>
  )
}

export default FormEdit;