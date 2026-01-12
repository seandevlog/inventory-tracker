import { Form, Input, Redirect } from './auth.components';

const Login = () => {
  return (
    <>
      <h1>Welcome back!</h1>
      <h6>Please enter your details</h6>
      <Form action="/auth/login" buttonText="Login">
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
          autoComplete="current-password"
        >
          Password
        </Input>
      </Form>
      <Redirect url="/register">I don't have an account</Redirect>
    </>
  )
}

export default Login;