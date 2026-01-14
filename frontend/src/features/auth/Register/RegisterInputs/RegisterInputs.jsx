import ValidatedInput from "../../../../components/ValidatedInput/ValidatedInput";

const RegisterInputs = ({ className, children }) => (
  <>
    <ValidatedInput
      id="username"
      className={className}  
      type="text"
      autoComplete="username"
      value={children.username || ''}
    >
      Username
    </ValidatedInput>
    <ValidatedInput 
      id="password" 
      className={className}
      type="password"
      autoComplete="new-password"
      value={children.password || ''}
    >
      Password
    </ValidatedInput>
    <ValidatedInput 
      id="givenName" 
      className={className}
      type="text"
      autoComplete="given-name"
      value={children.givenName || ''}
    >
      Given Name
    </ValidatedInput>
    <ValidatedInput 
      id="familyName" 
      className={className}
      type="text"
      autoComplete="family-name"
      value={children.familyName || ''}
    >
      Family Name
    </ValidatedInput>
    <ValidatedInput 
      id="contact" 
      className={className}
      type="text"
      autoComplete="mobile"
      value={children.contact || ''}
    >
      Contact
    </ValidatedInput>
    <ValidatedInput 
      id="address" 
      className={className}
      type="text"
      autoComplete="address-line1"
      value={children.address || ''}
    >
      Address
    </ValidatedInput>
  </>
)

export default RegisterInputs;