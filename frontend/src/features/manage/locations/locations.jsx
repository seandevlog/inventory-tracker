import { useContext } from 'react';
import { locationSchema } from '@my-org/shared/validators'
import headers from './headers';
import inputs from './inputs';

import Location from '@assets/placeholders/location.svg';

import DataTable from '@layouts/dataTable/dataTable';

import AppContext from '@contexts/app.context';

import config from '@config';
const { path } = config;

const Locations = () => {
  const { locations, bumpLocationRefresh } = useContext(AppContext);

  return (
    <DataTable
      id={path.locations.relative}
      data={locations}
      headers={headers}
      FeaturePlaceholder={Location}
      inputs={inputs}
      schema={locationSchema}
      onSubmitted={bumpLocationRefresh}
    />
  )
}

export default Locations