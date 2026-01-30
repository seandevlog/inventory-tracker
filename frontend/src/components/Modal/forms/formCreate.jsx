import { 
  Form,
  useActionData, 
  useOutletContext
} from 'react-router-dom';
import ImageUpload from '@components/imageUpload/imageUpload';
import ValidatedInput from '@components/validatedInput/validatedInput';
import ErrorBox from '@components/errorBox/errorBox';
import styles from './form.module.css';

const FormCreate = () => {
  const {
    FeaturePlaceholder,
    inputs,
    schema
  } = useOutletContext();
  const actionData = useActionData();
  const { error } = actionData || {};

  return (
    <Form
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
            {inputs.map(input => 
              (input.type === 'text' && !input.disabled) &&
              <ValidatedInput
                key={input.id}
                id={input.id}
                label={input.label}
                type={input.type}
                autoComplete={input.autoComplete ?? 'off'}
                schema={schema.extract(input.id)}
              /> 
            )}
          </div>
          <div className={styles.option}>
            {inputs.map(input => 
              (input.type === 'select' && !input.disabled) &&
              <ValidatedInput
                key={input.id}
                id={input.id}
                label={input.label}
                type={input.type}
                options={input.options}
                schema={schema.extract(input.id)}
              /> 
            )}
          </div>
          <div className={styles.errorBox}>
            <ErrorBox>{error}</ErrorBox>
          </div>
        </div>
      </fieldset>
      <div>
        <button 
          type="submit"
          className='btn'
        >
          Save
        </button>
      </div>
    </Form>
  )
}

export default FormCreate;