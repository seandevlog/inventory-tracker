import { Form } from 'react-router-dom';

import RedirectLink from '../../../components/RedirectLink/RedirectLink';
import RegisterInputs from './RegisterInputs/RegisterInputs';

const Register = () => {
  return (
    <>
      <h1>Who are you?</h1>
      <h6>Please enter your details</h6>
      <Form action="/auth/register">
        <RegisterInputs/>
        <button type="submit" className="btn">Register</button>
        <div className="error-box" id="error-box"></div>
      </Form>
      <RedirectLink className="authRedirect" url="/login">I already have an account</RedirectLink>
    </>
  )
}

export default Register;