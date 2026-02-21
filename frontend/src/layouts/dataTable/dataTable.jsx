import { useState, useContext, useMemo, useReducer, useEffect } from 'react';
import { filter } from 'lodash';

import styles from './dataTable.module.css';

import firstCharUppercase from '@utils/firstCharUppercase';
import removeLastS from '@utils/removeLastS';

import Sidebar from '@layouts/sidebar/sidebar';

import Table from './table/table';
import { 
  FormCreate, 
  FormEdit, 
  FormView 
} from './forms/';

import Lock from '@assets/lock.svg'
import { ArrowDownThick } from '@assets/arrows';
import EmptyBox from '@assets/empty-box.svg';
import Plus from '@assets/plus.svg';
import CloseBtn from '@assets/closeButton.svg'

import DataTableContext from '@contexts/dataTable.context';
import AppContext from '@contexts/app.context';

import useModal from '@hooks/useModal';

import config from '@config';
const { path } = config;

const reducer = (state, action) => {
  switch (action.type) {
    case 'create':
      return {
        ...state,
        title: `Create ${removeLastS(firstCharUppercase(state.id))}`,
        Form: FormCreate,
        show: true
      }
    case 'view':
      return {
        ...state,
        title: `View ${removeLastS(firstCharUppercase(state.id))}`,
        Form: FormView,
        param: action.payload?.param || state.param,
        show: true
      }
    case 'edit':
      return {
        ...state,
        title: `Edit ${removeLastS(firstCharUppercase(state.id))}`,
        Form: FormEdit,
        param: state.param,
        show: true
      }
    case 'close':
      return {
        ...state,
        show: false
      }
    default:
      throw new Error('Modal type invalid');
  }
}

const DataTable = ({ id, data, headers, FeaturePlaceholder, selections, inputs, schema, disabled, onSubmitted }) => {
  const { profile } = useContext(AppContext);
  const { role } = profile || {};

  const {
    setContent,
    Component: Modal,
    setVisibility
  } = useModal(styles)

  const [filterOptions, setFilterOptions] = useState({});

  const [state, dispatch] = useReducer(reducer, {
    id, show: false, title: null, Form: null 
  })

  useEffect(() => {
    setContent(() =>
      <>
        <CloseButton 
          onClick={() => setVisibility(false)}
          styles={styles}
        />
        <ModalHeader
          title={state.title}
          styles={styles}
        />
        {state.Form !== null 
          ? <state.Form/> 
          : null
        }
      </>
    );
  }, [setContent, state.Form, state.title, setVisibility, styles]);

  useEffect(() => {
    setVisibility(state.show)
  }, [state, setVisibility])

  const filteredData = useMemo(() =>
    filter(data, filterOptions)
  ,[data, filterOptions]);

  const singleData = useMemo(() =>
    filter(filteredData, { _id: state.param })
  , [filteredData, state.param])

  const allowed = useMemo(() =>
    role && (
      role === 'staff' && (
        id !== path.items.relative && 
        id !== path.locations.relative && 
        id !== path.suppliers.relative
      ) ||
      role !== 'staff'
    )
  , [id, role])

  return (typeof disabled === 'undefined' || (typeof disabled !== 'undefined' && !disabled?.current)
    ? <DataTableContext.Provider value={{
      id,
      FeaturePlaceholder,
      setFilterOptions,
      filterOptions,
      selections,
      inputs,
      schema,
      singleData,
      groupData: data,
      onSubmitted,
      dispatchModal: dispatch 
    }}>
      <main className={styles.main}>
        <div>
          {data && data.length > 0 &&
            <Sidebar/>
          }
          {allowed &&
            <CreateButton
              onClick={() => dispatch({ type: 'create' })}
              styles={styles}
            >
              {`New ${id && firstCharUppercase(id)}`}
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
          <Modal/>
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

const CreateButton = ({ children, onClick, styles }) => {
  return (
    <div 
      className={styles.create}
    >
      <button
        onClick={onClick}
      >
        <Plus/>
      </button>
      <div>
        {children}
      </div>
    </div>
  )
}

const CloseButton = ({ onClick, styles }) => {
  return (
    <button 
      className={styles.close}
      onClick={onClick}  
    >
      <CloseBtn/>
    </button>
  )
}

const ModalHeader = ({ title, styles }) => (
  <div className={styles.header}>
    <header>{title}</header>
  </div>
)

export default DataTable;