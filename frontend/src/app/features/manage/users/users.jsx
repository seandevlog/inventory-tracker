import * as React from 'react';
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import { filter, every } from 'lodash';
import { userSchema, userSelections as selections } from '@my-org/shared/validators'

import Filter from '@components/filter/filter';
import CreateButton from '@components/buttons/create/create';
import Table from '@components/table/table';
import inputs from './users.inputs';

const headers = [
  { value: 'Feature', sort: false, attribute: 'feature', index: 0},
  { value: 'Username', sort: true, attribute: 'username', index: 1},
  { value: 'Given Name', sort: true, attribute: 'givenName', index: 2},
  { value: 'Family Name', sort: true, attribute: 'familyName', index: 3},
  { value: 'Contact', sort: true, attribute: 'contact', index: 4},
  { value: 'Address', sort: true, attribute: 'address', index: 5},
];

const Users = () => {
  const users = useLoaderData();
  const navigate = useNavigate();

  const [filterOptions, setFilterOptions] = React.useState({});

  const filteredUsers = filter(users, filterOptions);

  return (
    <>
      <Filter
        selections={selections} 
        setFilterOptions={setFilterOptions}
        filterOptions={filterOptions}
      />
      <CreateButton
        onClick={() => navigate('create')}
      >
        New User
      </CreateButton>
      <Table 
        headers={headers}
      >
        {(filteredUsers && filteredUsers.length > 0) 
        ? filteredUsers.map(({ password, ...rest }) => {
          return rest;
        })
        : []}
      </Table>
      <Outlet 
        context={{
          data: filteredUsers,
          schema: userSchema,
          paramId: 'userId',
          inputs: inputs
        }}
      />
    </>
  )
}

export default Users