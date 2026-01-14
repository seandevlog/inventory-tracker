import ValidatedInput from "../../../../components/ValidatedInput/ValidatedInput";

const RegisterInputs = ({ className }) => (
  <>
    <ValidatedInput
      id="username"
      className={className}  
      type="text"
      autoComplete="username"
    >
      Username
    </ValidatedInput>
    <ValidatedInput 
      id="password" 
      className={className}
      type="password"
      autoComplete="new-password"
    >
      Password
    </ValidatedInput>
    <ValidatedInput 
      id="givenName" 
      className={className}
      type="text"
      autoComplete="given-name"
    >
      Given Name
    </ValidatedInput>
    <ValidatedInput 
      id="familyName" 
      className={className}
      type="text"
      autoComplete="family-name"
    >
      Family Name
    </ValidatedInput>
    <ValidatedInput 
      id="contact" 
      className={className}
      type="text"
      autoComplete="mobile"
    >
      Contact
    </ValidatedInput>
    <ValidatedInput 
      id="address" 
      className={className}
      type="text"
      autoComplete="address-line1"
    >
      Address
    </ValidatedInput>
  </>
)

export default RegisterInputs;