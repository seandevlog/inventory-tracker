import { useContext } from 'react';
import { userSchema, userSelections as selections } from '@my-org/shared/validators'
import headers from './headers';
import inputs from './inputs';

import Portrait from '@assets/placeholders/portrait.svg';

import Main from '@layouts/main/main';

import ManageContext from '@contexts/manage.context';

const Users = () => {
  const { users } = useContext(ManageContext);
  const usersNoPW = 
    (users && users.length > 0) 
      ? (users.map(({ password, ...rest }) => rest)) 
      : []

  return (
    <>
      <Main
        id='user'
        data={usersNoPW}
        headers={headers}
        FeaturePlaceholder={Portrait}
        selections={selections}
        inputs={inputs}
        schema={userSchema}
      />
    </>
  )
}

export default Users