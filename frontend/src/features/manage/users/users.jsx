import { useContext } from 'react';
import { userSchema, userSelections as selections } from '@my-org/shared/validators'
import headers from './headers';
import inputs from './inputs';

import Portrait from '@assets/placeholders/portrait.svg';

import DataTable from '@layouts/dataTable/dataTable';

import AppContext from '@contexts/app.context'; 

const Users = () => {
  const { users, bumpUserRefresh } = useContext(AppContext);

  return (
    <DataTable
      id='user'
      data={users}
      headers={headers}
      FeaturePlaceholder={Portrait}
      selections={selections}
      inputs={inputs}
      schema={userSchema}
      onSubmitted={bumpUserRefresh}
    />
  )
}

export default Users