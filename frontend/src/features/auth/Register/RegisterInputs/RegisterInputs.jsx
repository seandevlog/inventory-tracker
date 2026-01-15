import ValidatedInput from "../../../../components/ValidatedInput/ValidatedInput";

const RegisterInputs = ({ className, children, disabled }) => (
  <>
    <ValidatedInput
      id="username"
      className={className}  
      type="text"
      autoComplete="username"
      value={children?.username || ''}
      disabled={disabled}
    >
      Username
    </ValidatedInput>
    <ValidatedInput 
      id="password" 
      className={className}
      type="password"
      autoComplete="new-password"
      value={children?.password || ''}
      disabled={disabled}
    >
      Password
    </ValidatedInput>
    <ValidatedInput 
      id="givenName" 
      className={className}
      type="text"
      autoComplete="given-name"
      value={children?.givenName || ''}
      disabled={disabled}
    >
      Given Name
    </ValidatedInput>
    <ValidatedInput 
      id="familyName" 
      className={className}
      type="text"
      autoComplete="family-name"
      value={children?.familyName || ''}
      disabled={disabled}
    >
      Family Name
    </ValidatedInput>
    <ValidatedInput 
      id="contact" 
      className={className}
      type="text"
      autoComplete="mobile"
      value={children?.contact || ''}
      disabled={disabled}
    >
      Contact
    </ValidatedInput>
    <ValidatedInput 
      id="address" 
      className={className}
      type="text"
      autoComplete="address-line1"
      value={children?.address || ''}
      disabled={disabled}
    >
      Address
    </ValidatedInput>
  </>
)

export default RegisterInputs;