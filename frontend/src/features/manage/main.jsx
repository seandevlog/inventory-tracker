import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { filter } from 'lodash';
import firstCharUppercase from '@utils/firstCharUppercase';

import Filter from '@components/filter/filter';
import CreateButton from '@components/buttons/create/create';
import Table from '@components/table/table';

import MainContext from '@contexts/main.context';

const Main = ({ id, data, headers, FeaturePlaceholder, selections, Form }) => {
  const navigate = useNavigate();

  const [filterOptions, setFilterOptions] = useState({});

  const filteredData = filter(data, filterOptions);

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
      <Outlet context={{ data, Form }}/>
    </MainContext.Provider>
  )
}

export default Main;