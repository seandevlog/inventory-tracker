import { Form } from 'react-router-dom';
import RedirectLink from '@components/buttons/redirect/redirect';
import UserInputs from '../users/userInputs';

const Register = () => {
  return (
    <>
      <h1>Who are you?</h1>
      <h6>Please enter your details</h6>
      <Form method="post">
        <UserInputs/>
        <button type="submit" className="btn">Register</button>
      </Form>
      <RedirectLink className="authRedirect" url="/">I already have an account</RedirectLink>
    </>
  )
}

export default Register;