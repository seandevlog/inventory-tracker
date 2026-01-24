import * as React from 'react';
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import { filter, every } from 'lodash';
import { itemSchema, itemSelections as selections } from '@my-org/shared/validators'

import Filter from '@components/filter/filter';
import CreateButton from '@components/buttons/create/create';
import Table from '@components/table/table';
import inputs from './items.inputs';

const headers = [
  { value: 'Feature', sort: false, attribute: 'feature', index: 0},
  { value: 'SKU', sort: true, attribute: 'sku', index: 1},
  { value: 'Item Name', sort: true, attribute: 'name', index: 2},
  { value: 'Category', sort: true, attribute: 'category', index: 3},
];

const Items = () => {
  const items = useLoaderData();
  const navigate = useNavigate();

  const [filterOptions, setFilterOptions] = React.useState({});
  
  const filteredItems = filter(items, filterOptions);

  return (
    <>
      <Filter
        selections={selections} 
        setFilterOptions={setFilterOptions}
        filterOptions={filterOptions}
      />
      <CreateButton
        onClick={() => navigate('create')}
      >
        New Item
      </CreateButton>
      <Table 
        headers={headers}
      >
        {(filteredItems && filteredItems.length > 0) 
        ? filteredItems
        : []}
      </Table>
      <Outlet 
        context={{
          data: filteredItems,
          schema: itemSchema,
          paramId: 'userId',
          inputs: inputs
        }}
      />
    </>
  )
}

export default Items