import { useLoaderData } from 'react-router-dom';
import { itemSchema, itemSelections as selections } from '@my-org/shared/validators'
import headers from './headers';
import inputs from './inputs';

import Portrait from '@assets/placeholders/portrait.svg';

import Main from '@features/manage/main';

const Items = () => {
  const items = useLoaderData();

  return (
    <>
      <Main
        id='item'
        data={items}
        headers={headers}
        FeaturePlaceholder={Portrait}
        selections={selections}
        inputs={inputs}
        schema={itemSchema}
      />
    </>
  )
}

export default Items