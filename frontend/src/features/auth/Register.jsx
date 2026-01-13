import { Form } from 'react-router-dom';

import RedirectLink from '../../components/RedirectLink/RedirectLink';
import ValidatedInput from '../../components/ValidatedInput';

const Register = () => {
  return (
    <>
      <h1>Who are you?</h1>
      <h6>Please enter your details</h6>
      <Form action="/auth/register">
        <RegisterInputs/>
        <button type="submit" className="btn">Sign Up</button>
        <div className="error-box" id="error-box"></div>
      </Form>
      <RedirectLink url="/login">I already have an account</RedirectLink>
    </>
  )
}

export const RegisterInputs = () => (
  <>
    <ValidatedInput 
      id="username"  
      type="text"
      autoComplete="username"
    >
      Username
    </ValidatedInput>
    <ValidatedInput 
      id="password" 
      type="password"
      autoComplete="new-password"
    >
      Password
    </ValidatedInput>
    <ValidatedInput 
      id="givenName" 
      type="text"
      autoComplete="given-name"
    >
      Given Name
    </ValidatedInput>
    <ValidatedInput 
      id="familyName" 
      type="text"
      autoComplete="family-name"
    >
      Family Name
    </ValidatedInput>
    <ValidatedInput 
      id="contact" 
      type="text"
      autoComplete="mobile"
    >
      Contact
    </ValidatedInput>
    <ValidatedInput 
      id="address" 
      type="text"
      autoComplete="address-line1"
    >
      Address
    </ValidatedInput>
  </>
)

export default Register;