import { Form } from 'react-router-dom';
import { RedirectLink } from '@components';
import RegisterInputs from './RegisterInputs/RegisterInputs';
import { userSchema } from '@shared/validators';

const Register = () => {
  return (
    <>
      <h1>Who are you?</h1>
      <h6>Please enter your details</h6>
      <Form method="post">
        <RegisterInputs schema={userSchema}/>
        <button type="submit" className="btn">Register</button>
      </Form>
      <RedirectLink className="authRedirect" url="/">I already have an account</RedirectLink>
    </>
  )
}

export default Register;