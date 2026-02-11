import { useContext } from 'react';
import { userSchema, userSelections as selections } from '@my-org/shared/validators'
import headers from './headers';
import inputs from './inputs';

import Portrait from '@assets/placeholders/portrait.svg';

import Main from '@layouts/main/main';

import AppContext from '@contexts/app.context'; 

const Users = () => {
  const { users, bumpUserRefresh } = useContext(AppContext);

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
        onSubmitted={bumpUserRefresh}
      />
    </>
  )
}

export default Users