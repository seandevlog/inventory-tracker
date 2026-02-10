import { useState, useContext, useMemo } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { filter } from 'lodash';

import styles from './main.module.css';

import firstCharUppercase from '@utils/firstCharUppercase';

import Sidebar from '@layouts/sidebar/sidebar';
import CreateButton from '@components/buttons/create/create';
import Table from '@components/table/table';
import Lock from '@assets/lock.svg'
import { ArrowDownThick } from '@assets/arrows';
import SleepingDog from '@assets/sleepingDog.svg';

import MainContext from '@contexts/main.context';
import AppContext from '@contexts/app.context';

const Main = ({ id, data, headers, FeaturePlaceholder, selections, inputs, schema, disabled }) => {
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
    ? <MainContext.Provider value={{
      id,
      FeaturePlaceholder,
      setFilterOptions,
      filterOptions,
      selections
    }}>
      <main className={styles.main}>
        <div>
          {filteredData && filteredData.length > 0 &&
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
                <span>No entries yet. The 'plus' button is your friend.</span>
                <ArrowDownThick/>
                <SleepingDog/>
              </div>
          }
          <Outlet context={{ 
            groupData: filteredData,
            singleData,
            inputs,
            FeaturePlaceholder,
            schema 
          }}/>
        </div>
      </main>
    </MainContext.Provider>
    : <main className={styles.disabled}>
      <span>
        <Lock/>
        <p>{disabled.message}</p>
      </span>
    </main>
  )
}

export default Main;