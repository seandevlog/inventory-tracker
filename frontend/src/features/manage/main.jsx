import { useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { filter } from 'lodash';
import firstCharUppercase from '@utils/firstCharUppercase';

import Filter from '@components/filter/filter';
import CreateButton from '@components/buttons/create/create';
import Table from '@components/table/table';

import MainContext from '@contexts/main.context';

const Main = ({ id, data, headers, FeaturePlaceholder, selections, inputs, schema }) => {
  const navigate = useNavigate();
  const params = useParams();
  const paramId = params ? Object.values(params)?.[0] : '';

  const [filterOptions, setFilterOptions] = useState({});

  const filteredData = filter(data, filterOptions);

  const singleData = filter(filteredData, { _id: paramId });

  return (
    <MainContext.Provider value={{
      FeaturePlaceholder
    }}>
      <Filter
        setFilterOptions={setFilterOptions}
        filterOptions={filterOptions}
        selections={selections}
      />
      <CreateButton
        onClick={() => navigate('create')}
      >
        {`New ${firstCharUppercase(id)}`}
      </CreateButton>
      <Table headers={headers} data={filteredData}/>
      <Outlet context={{ 
        data: singleData, 
        inputs,
        FeaturePlaceholder,
        schema 
      }}/>
    </MainContext.Provider>
  )
}

export default Main;