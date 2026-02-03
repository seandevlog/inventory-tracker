import { useLoaderData } from 'react-router-dom';
import { itemSchema, itemSelections as selections } from '@my-org/shared/validators'
import headers from './headers';
import inputs from './inputs';

import Item from '@assets/placeholders/item.svg';

import Main from '@layouts/main/main';

const Items = () => {
  const items = useLoaderData();

  return (
    <>
      <Main
        id='item'
        data={items}
        headers={headers}
        FeaturePlaceholder={Item}
        selections={selections}
        inputs={inputs}
        schema={itemSchema}
      />
    </>
  )
}

export default Items