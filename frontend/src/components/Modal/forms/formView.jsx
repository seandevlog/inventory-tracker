import { 
  Form,
  useNavigate,
  useOutletContext
} from 'react-router-dom';
import ImageUpload from '@components/imageUpload/imageUpload';
import ValidatedInput from '@components/validatedInput/validatedInput';
import styles from './form.module.css';

const FormView = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`edit`, { relative: 'path' })
  };

  const {
    FeaturePlaceholder,
    inputs
  } = useOutletContext();

  return (
    <Form
      method="post"
      encType="multipart/form-data"
    >
      <ImageUpload 
        ImagePlaceholder={FeaturePlaceholder}
        disabled={true}
      />
      <fieldset className={styles.form}>
        <legend></legend>
        <div>
          <div className={styles.text}>
            {inputs.map(input => 
              input.type === 'text' &&
              <ValidatedInput
                key={input.id}
                id={input.id}
                label={input.label}
                disabled={true}
              /> 
            )}
          </div>
          <div className={styles.option}>
            {inputs.map(input => 
              (input.options && input.options?.length > 0) &&
              <ValidatedInput
                key={input.id}
                id={input.id}
                label={input.label}
                disabled={true}
              /> 
            )}
          </div>
          <div className={styles.date}>
            {inputs.map(input => 
              input.type === 'date' &&
              <ValidatedInput
                key={input.id}
                id={input.id}
                label={input.label}
                type={input.type}
                autoComplete={input.autoComplete ?? 'off'}
                disabled={input.disabled}
              /> 
            )}
          </div>
        </div>
      </fieldset>
      <div>
        <button 
          type="button"
          className='btn'
          onClick={handleNavigate}
        >
          Edit
        </button>
      </div>
    </Form>
  )
}

export default FormView;