import { useLoaderData } from 'react-router-dom';
import { userSchema, userSelections as selections } from '@my-org/shared/validators'
import headers from './headers';
import inputs from './inputs';

import Portrait from '@assets/placeholders/portrait.svg';

import Main from '@layouts/main/main';

const Users = () => {
  const users = useLoaderData();
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