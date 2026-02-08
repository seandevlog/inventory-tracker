import { useContext } from 'react';
import { locationSchema } from '@my-org/shared/validators'
import headers from './headers';
import inputs from './inputs';

import Location from '@assets/placeholders/location.svg';

import Main from '@layouts/main/main';

import ManageContext from '@contexts/manage.context';

const Locations = () => {
  const { locations } = useContext(ManageContext);

  return (
    <>
      <Main
        id='location'
        data={locations}
        headers={headers}
        FeaturePlaceholder={Location}
        inputs={inputs}
        schema={locationSchema}
      />
    </>
  )
}

export default Locations