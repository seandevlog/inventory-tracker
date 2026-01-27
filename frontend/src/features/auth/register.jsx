import { Form } from 'react-router-dom';
import RedirectLink from '@components/buttons/redirect/redirect';
import userInputs from '@features/manage/users/inputs';
import { userSchema } from '@my-org/shared/validators';
import ValidatedInput from '@components/validatedInput/validatedInput';

const Register = () => {
  const filteredInputs = userInputs.filter((input) => (input.id !== 'isActive' && input.id !== 'role') && input); 

  return (
    <>
      <h1>Who are you?</h1>
      <h6>Please enter your details</h6>
      <Form method="post">
        {filteredInputs.map(input => (
          <ValidatedInput
            key={input.id}
            id={input.id}
            label={input.label}
            type={input.type}
            autoComplete={input.autoComplete}
            schema={userSchema.extract(input.id)}
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