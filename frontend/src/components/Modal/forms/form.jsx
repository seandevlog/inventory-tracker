import { useActionData, useOutletContext } from "react-router-dom";
import ImageUpload from '@components/imageUpload/imageUpload';
import ValidatedInput from '@components/validatedInput/validatedInput';
import ErrorBox from '@components/errorBox/errorBox';
import styles from './form.module.css';

const Form = ({ disabled }) => {
  const {
    FeaturePlaceholder,
    inputs,
    schema
  } = useOutletContext();
  const actionData = useActionData();
  const { error } = actionData || {};

  return (
    <>
      <ImageUpload ImagePlaceholder={FeaturePlaceholder} />
      <fieldset className={styles.form}>
        <legend></legend>
        <div>
          <div className={styles.text}>
            {inputs.map(input => 
              !input.options &&
              <ValidatedInput
                key={input.id}
                id={input.id}
                label={input.label}
                type={input.type}
                options={input.options}
                autoComplete={input.autoComplete ?? ''}
                schema={schema.extract(input.id)}
                disabled={disabled}
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
                type={input.type}
                options={input.options}
                autoComplete={input.autoComplete ?? ''}
                schema={schema.extract(input.id)}
                disabled={disabled}
              /> 
            )}
          </div>
          <div className={styles.errorBox}>
            <ErrorBox>{error}</ErrorBox>
          </div>
        </div>
      </fieldset>
    </>
  )
}

export default Form;