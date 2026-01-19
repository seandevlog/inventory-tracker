import * as React from 'react';
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import { filter } from 'lodash';
import { 
  FilterSelect, 
  CreateButton,
  Table,
} from '../../components/index'

const Users = () => {
  const users = useLoaderData();
  const navigate = useNavigate();

  const [filterAttr, setFilterAttr] = React.useState('');

  const handleFilter = (event) => {
    setFilterAttr(event.target.value);
  } 

  const filteredUsers = filterAttr && (filterAttr !== 'noFilter') ? filter(users, {'status': filterAttr}) : users;

  return (
    <>
      <FilterSelect onFilter={handleFilter}/>
      <CreateButton
        onClick={() => navigate('create')}
      >
        New User
      </CreateButton>
      <Table 
        headers={[
          { value: 'Profile', sort: false, attribute: 'profile', index: 0},
          { value: 'Username', sort: true, attribute: 'username', index: 1},
          { value: 'Given Name', sort: true, attribute: 'givenName', index: 2},
          { value: 'Family Name', sort: true, attribute: 'familyName', index: 3},
          { value: 'Contact', sort: true, attribute: 'contact', index: 4},
          { value: 'Address', sort: true, attribute: 'address', index: 5},
        ]}
      >
        {filteredUsers && filteredUsers.length > 0 && filteredUsers.map(({ password, ...rest }) => {
          return rest;
        })}
      </Table>
      <Outlet />
    </>
  )
}

export default Users