import { useState, useContext, useMemo } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { filter } from 'lodash';

import styles from './dataTable.module.css';

import firstCharUppercase from '@utils/firstCharUppercase';

import Sidebar from '@layouts/sidebar/sidebar';
import CreateButton from '@components/buttons/create/create';
import Table from '@components/table/table';
import Lock from '@assets/lock.svg'
import { ArrowDownThick } from '@assets/arrows';
import EmptyBox from '@assets/empty-box.svg';

import DataTableContext from '@contexts/dataTable.context';
import AppContext from '@contexts/app.context';

const DataTable = ({ id, data, headers, FeaturePlaceholder, selections, inputs, schema, disabled, onSubmitted }) => {
  const { profile } = useContext(AppContext);
  const { role } = profile || {};
  const navigate = useNavigate();
  const params = useParams();
  const paramId = params ? Object.values(params)?.[0] : '';

  const [filterOptions, setFilterOptions] = useState({});

  const filteredData = useMemo(() =>
    filter(data, filterOptions)
  ,[data, filterOptions]);

  const singleData = useMemo(() =>
    filter(filteredData, { _id: paramId })
  , [filteredData, paramId])

  return (typeof disabled === 'undefined' || (typeof disabled !== 'undefined' && !disabled?.current)
    ? <DataTableContext.Provider value={{
      id,
      FeaturePlaceholder,
      setFilterOptions,
      filterOptions,
      selections
    }}>
      <main className={styles.main}>
        <div>
          {data && data.length > 0 &&
            <Sidebar/>
          }
          {role && 
            ((role === 'staff' && 
              (id !== 'item' && id !== 'location' && id !== 'supplier')) ||
            role !== 'staff') &&
              <CreateButton
                onClick={() => navigate('create')}
              >
                {`New ${firstCharUppercase(id)}`}
              </CreateButton>
          }
          {filteredData && filteredData.length > 0
            ? <div>
                <Table headers={headers} data={filteredData}/>
              </div>
            : <div className={styles.noData}>
                <span>No entries yet. Press the '+' button.</span>
                <ArrowDownThick/>
                <EmptyBox/>
              </div>
          }
          <Outlet context={{ 
            groupData: filteredData,
            singleData,
            inputs,
            FeaturePlaceholder,
            schema,
            onSubmitted 
          }}/>
        </div>
      </main>
    </DataTableContext.Provider>
    : <main className={styles.disabled}>
      <span>
        <Lock/>
        <p>{disabled.message}</p>
      </span>
    </main>
  )
}

export default DataTable;