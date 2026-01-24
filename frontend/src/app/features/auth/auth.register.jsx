import { Form } from 'react-router-dom';
import RedirectLink from '@components/buttons/redirect/redirect';
import userInputs from '../manage/users/users.inputs';
import ValidatedInput from '@components/validatedInput/validatedInput';
import { userSchema } from '@my-org/shared/validators';

const Register = () => {
  return (
    <>
      <h1>Who are you?</h1>
      <h6>Please enter your details</h6>
      <Form method="post">
        {userInputs.map(input => (
          <ValidatedInput
            key={input.id}
            id={input.id}
            label={input.label}
            type={input.type}
            autoComplete={input.autoComplete}
            schema={userSchema}
          >
          </ValidatedInput>
        ))}
        <button 
          type="submit" 
          className="btn"
        >
          Register
        </button>
      </Form>
      <RedirectLink 
        className="authRedirect" 
        url="/"
      >
        I already have an account
      </RedirectLink>
    </>
  )
}

export default Register;