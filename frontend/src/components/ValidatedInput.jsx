const ValidatedInput = ({ id, children, type, autoComplete }) => {
  // const [value, setValue] = React.useState('');

  return (
    <div>
      <label htmlFor={id}>{children}</label>
      <span id="validation-error" className="validation-error"></span>
      <input type={type} id={id} name={id} autoComplete={autoComplete} defaultValue=""/>
    </div>
  )
}

export default ValidatedInput;