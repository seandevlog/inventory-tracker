import { userSelections as selections } from '@my-org/shared/validators'

const inputs = [
  { id: 'username', type: 'text', autoComplete: 'username', label: 'Username' },
  { id: 'password', type: 'password', autoComplete: 'new-password', label: 'Password' },
  { id: 'givenName', type: 'text', autoComplete: 'given-name', label: 'Given Name' },
  { id: 'familyName', type: 'text', autoComplete: 'family-name', label: 'Family Name' },
  { id: 'contact', type: 'text', autoComplete: 'mobile', label: 'Contact' },
  { id: 'address', type: 'text', autoComplete: 'address-line1', label: 'Address' },
  { id: 'isActive', type: 'select', options: selections.isActive, label: 'Status' },
  { id: 'role', type: 'select', options: selections.role, label: 'Role' },
];

export default inputs;