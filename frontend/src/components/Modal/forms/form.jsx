import { useOutletContext } from "react-router-dom";
import ImageUpload from '@components/imageUpload/imageUpload';
import ValidatedInput from '@components/validatedInput/validatedInput';

const Form = ({ disabled }) => {
  const {
    FeaturePlaceholder,
    inputs,
    schema
  } = useOutletContext();

  return (
    <>
      <ImageUpload ImagePlaceholder={FeaturePlaceholder} />
      <fieldset>
        <legend></legend>
        <div>
          {inputs.map(input => 
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
      </fieldset>
    </>
  )
}

export default Form;