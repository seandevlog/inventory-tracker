const Login = () => {
  return (
    <>
      <h1>Welcome back!</h1>
      <h6>Please enter your details</h6>
      <form action="/auth/login" method="POST">
        <div>
          <label htmlFor="username">Username</label>
          <span id="validation-error" className="validation-error"></span>
          <input 
            type="text" 
            id="username" name="username" autoComplete="username" data-id="Username"
            value="" 
          /> 
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <span id="validation-error" className="validation-error"></span>
          <input 
            type="password"
            id="password"
            name="password"
            autoComplete="current-password" 
            data-id="Password"
            value=""
          />
        </div>
        <button type="submit" className="btn" name="button">Login</button>`
        <div className="error-box" id="error-box"></div>
      </form>
      <span id="redirect" data-url="/register">I don't have an account</span>
    </>
  )
}

export default Login;