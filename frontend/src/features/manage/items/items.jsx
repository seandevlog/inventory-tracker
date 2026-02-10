import { useContext } from 'react';
import { itemSchema, itemSelections as selections } from '@my-org/shared/validators'
import headers from './headers';
import inputs from './inputs';

import Item from '@assets/placeholders/item.svg';

import Main from '@layouts/main/main';

import ManageContext from '@contexts/manage.context';

const Items = () => {
  const { items, bumpItemRefresh } = useContext(ManageContext);

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
        onSubmitted={bumpItemRefresh}
      />
    </>
  )
}

export default Items