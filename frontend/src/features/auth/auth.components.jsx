export const Form = ({ action, children, buttonText }) => {
  return (
    <form action={action}>
      {children}
      <button type="submit" className="btn" name="button">{buttonText}</button>`
      <div className="error-box" id="error-box"></div>
    </form>
  )
};

export const Input = ({ id, children, type, autoComplete }) => {
  return (
    <div>
      <label htmlFor={id}>{children}</label>
      <span id="validation-error" className="validation-error"></span>
      <input type={type} id={id} name={id} autoComplete={autoComplete} value=""/>
    </div>
  )
}

export const Redirect = ({ url, children }) => {
  return (
    <span className="redirect" data-url={url}>{children}</span>
  )
}