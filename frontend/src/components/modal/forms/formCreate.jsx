import { useReducer, useMemo, useContext, useEffect } from 'react';
import { 
  Form,
  useActionData, 
  useNavigation, 
  useOutletContext
} from 'react-router-dom';
import ImageUpload from '@components/imageUpload/imageUpload';
import ErrorBox from '@components/errorBox/errorBox';
import styles from './formCreate.module.css';
import firstCharUppercase from '@utils/firstCharUppercase';
import splitUppercase from '@utils/splitUppercase';
import AppContext from '@contexts/app.context';
import MainContext from '@contexts/main.context';
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

const FormCreate = () => {
  const navigation = useNavigation();
  const { profile } = useContext(AppContext);
  const { role, username } = profile || {};
  const { id: manageFeature } = useContext(MainContext);

  const {
    FeaturePlaceholder,
    inputs,
    schema,
    onSubmitted
  } = useOutletContext();
  const actionData = useActionData();
  const { error: submitError } = actionData || {};

  const filteredInputs = useMemo(() => 
    inputs.filter(({ disabled }) => 
      !disabled
    )
  ,[inputs])

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

  useEffect(() => {
    if (navigation.state === 'submitting') {
      return () => onSubmitted();
    }
  }, [navigation, onSubmitted])
  
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
          <div>
            {filteredInputs.map(({id, type, autoComplete, label, options}) => {
              return (
              (typeof options === 'undefined' && id !== 'createdBy') &&
              <div 
                key={id}
                className={styles.input}
              >
                <input 
                  id={id}
                  name={id}
                  type={type} 
                  autoComplete={autoComplete}
                  value={inputReducer[id]?.[0]?.input ?? ''}
                  onChange={(e) => handleInput(e, inputReducer[id]?.[1])}
                />
                <span className={inputReducer[id]?.[0]?.input ? styles.floatPlaceholder : ''}>{`Enter ${label}`}</span>
                <span className={styles.validationError}>{inputReducer[id]?.[0]?.errorMessage}</span>
              </div>
            )})}
          </div>
          {filteredInputs.reduce((acc, {options}) => (
            acc || (options && options?.length > 0)), false) &&
            <div className={styles.option}>
              {filteredInputs.map(({id, type, label, disabled, options}) => (
                options && options?.length > 0 && !disabled &&
                <div 
                  key={id}
                  className={styles.selectInput}
                >
                  <select
                    id={id}
                    name={id}
                    type={type}
                    autoComplete='off'
                    value={inputReducer[id][0]?.input ?? ''}
                    onChange={(e) => handleInput(e, inputReducer[id][1])}
                  >
                    <option 
                      value=''
                      style={{ 'fontWeight': 'bolder' }}
                      disabled
                    >
                        {label}
                    </option>
                    {options.map(option => 
                      <option key={option} value={option}>
                        {splitUppercase(firstCharUppercase(option))}
                      </option>
                    )}
                  </select>
                  <span>
                    <ArrowDown/>
                  </span>
                  <span className={styles.validationError}>
                    {splitUppercase(firstCharUppercase(inputReducer[id][0]?.errorMessage))}
                  </span>
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
        </div>
      </fieldset>
      <div>
        <div className={styles.errorBox}>
          <ErrorBox>{submitError ?? ''}</ErrorBox>
        </div>
        <button 
          type="submit"
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
