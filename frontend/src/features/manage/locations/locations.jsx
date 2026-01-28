import { useLoaderData } from 'react-router-dom';
import { locationSchema } from '@my-org/shared/validators'
import headers from './headers';
import inputs from './inputs';

import Location from '@assets/placeholders/location.svg';

import Main from '@components/main/main';

const Locations = () => {
  const locations = useLoaderData();

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