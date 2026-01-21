import { ValidatedInput } from "@components";
import { userSchema } from '@my-org/shared/validators';

const UserInputs = ({ disabled, data }) => (
  <>
    <ValidatedInput
      id="username"
      type="text"
      autoComplete="username"
      value={data?.username || ''}
      disabled={disabled}
      schema={userSchema}
    >
      Username
    </ValidatedInput>
    <ValidatedInput 
      id="password"
      type="password"
      autoComplete="new-password"
      value={data?.password || ''}
      disabled={disabled}
      schema={userSchema}
    >
      Password
    </ValidatedInput>
    <ValidatedInput 
      id="givenName"
      type="text"
      autoComplete="given-name"
      value={data?.givenName || ''}
      disabled={disabled}
      schema={userSchema}
    >
      Given Name
    </ValidatedInput>
    <ValidatedInput 
      id="familyName"
      type="text"
      autoComplete="family-name"
      value={data?.familyName || ''}
      disabled={disabled}
      schema={userSchema}
    >
      Family Name
    </ValidatedInput>
    <ValidatedInput 
      id="contact"
      type="text"
      autoComplete="mobile"
      value={data?.contact || ''}
      disabled={disabled}
      schema={userSchema}
    >
      Contact
    </ValidatedInput>
    <ValidatedInput 
      id="address"
      type="text"
      autoComplete="address-line1"
      value={data?.address || ''}
      disabled={disabled}
      schema={userSchema}
    >
      Address
    </ValidatedInput>
  </>
)

export default UserInputs;