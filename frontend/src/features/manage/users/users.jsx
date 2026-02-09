import { useLoaderData } from 'react-router-dom';
import { userSchema, userSelections as selections } from '@my-org/shared/validators'
import headers from './headers';
import inputs from './inputs';

import Portrait from '@assets/placeholders/portrait.svg';

import Main from '@layouts/main/main';

const Users = () => {
  const users = useLoaderData();

  return (
    <>
      <Main
        id='user'
        data={users}
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