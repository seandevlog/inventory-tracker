import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { locationSchema } from '@my-org/shared/validators'
import headers from './headers';
import inputs from './inputs';

import Location from '@assets/placeholders/location.svg';

import Main from '@layouts/main/main';

import ManageContext from '@contexts/manage.context';

const Locations = () => {
  const { locations, bumpLocationRefresh } = useContext(ManageContext);

  return (
    <>
      <Main
        id='location'
        data={locations}
        headers={headers}
        FeaturePlaceholder={Location}
        inputs={inputs}
        schema={locationSchema}
        onSubmitted={bumpLocationRefresh}
      />
    </>
  )
}

export default Locations