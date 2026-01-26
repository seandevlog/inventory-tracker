import { useLoaderData } from 'react-router-dom';
import { userSchema, userSelections as selections } from '@my-org/shared/validators'
import headers from './headers';
import inputs from './inputs';

import TextInput from '@components/validatedInput/text';
import OptionsInput from '@components/validatedInput/options';
import ImageUpload from '@components/imageUpload/imageUpload';
import Portrait from '@assets/placeholders/portrait.svg';

import Main from '@features/manage/main';

const Users = () => {
  const users = useLoaderData();
  const usersNoPW = 
    (users && users.length > 0) 
      ? (users.map(({ password, ...rest }) => rest)) 
      : []

  return (
    <>
      <Main
        id='user'
        data={usersNoPW}
        headers={headers}
        FeaturePlaceholder={Portrait}
        selections={selections}
        Form={({ disabled }) => (
          <>
            <ImageUpload ImagePlaceholder={Portrait} />
            <fieldset>
              <legend></legend>
              <div>
                {inputs.map(input => 
                  !input.options
                  ? <TextInput
                      key={input.id}
                      id={input.id}
                      label={input.label}
                      type={input.type}
                      autoComplete={input.autoComplete ?? ''}
                      schema={userSchema.extract(input.id)}
                      disabled={disabled}
                    /> 
                  : null
                )}
              </div>
              <div>
                {inputs.map(input => 
                  input.options && input.options?.length > 0
                  ? <OptionsInput
                      key={input.id}
                      id={input.id}
                      label={input.label}
                      type={input.type}
                      schema={userSchema.extract(input.id)}
                      options={input.options}
                      disabled={disabled}
                    />
                  : null
                )}
              </div>
            </fieldset>
          </>
        )}
      />
    </>
  )
}

export default Users