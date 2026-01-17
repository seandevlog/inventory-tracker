import { ValidatedInput } from "@components";
import { userSchema } from '@shared/validators';

const RegisterInputs = ({ className, children, disabled }) => (
  <>
    <ValidatedInput
      id="username"
      className={className}  
      type="text"
      autoComplete="username"
      value={children?.username || ''}
      disabled={disabled}
      schema={userSchema}
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
      schema={userSchema}
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
      schema={userSchema}
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
      schema={userSchema}
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
      schema={userSchema}
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
      schema={userSchema}
    >
      Address
    </ValidatedInput>
  </>
)

export default RegisterInputs;