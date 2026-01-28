import { useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { filter } from 'lodash';

import styles from './main.module.css';

import firstCharUppercase from '@utils/firstCharUppercase';

import Sidebar from '@components/sidebar/sidebar';
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
      FeaturePlaceholder,
      setFilterOptions,
      filterOptions,
      selections
    }}>
      {selections && 
        (<div className={styles.sidebar}>
          <Sidebar/>
        </div>)
      }
      <CreateButton
        onClick={() => navigate('create')}
      >
        {`New ${firstCharUppercase(id)}`}
      </CreateButton>
      <div className={styles.tableWrapper}>
        <Table headers={headers} data={filteredData}/>
      </div>
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