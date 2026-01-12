import { Form, Input, Redirect } from './auth.components';

const Register = () => {
  return (
    <>
      <h1>Who are you?</h1>
      <h6>Please enter your details</h6>
      <Form action="/auth/register" buttonText="Register">
        <RegisterInputs/>
      </Form>
      <Redirect url="/login">I already have an account</Redirect>
    </>
  )
}

export const RegisterInputs = () => (
  <>
    <Input 
      id="username"  
      type="text"
      autoComplete="username"
    >
      Username
    </Input>
    <Input 
      id="password" 
      type="password"
      autoComplete="new-password"
    >
      Password
    </Input>
    <Input 
      id="givenName" 
      type="text"
      autoComplete="given-name"
    >
      Given Name
    </Input>
    <Input 
      id="familyName" 
      type="text"
      autoComplete="family-name"
    >
      Family Name
    </Input>
    <Input 
      id="contact" 
      type="text"
      autoComplete="mobile"
    >
      Contact
    </Input>
    <Input 
      id="address" 
      type="text"
      autoComplete="address-line1"
    >
      Address
    </Input>
  </>
)

export default Register;