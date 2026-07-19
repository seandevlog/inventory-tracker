import { useState, useContext, useMemo, useReducer, useEffect } from 'react';
import { filter } from 'lodash';

import styles from './dataTable.module.css';

import firstCharUppercase from '@utils/firstCharUppercase';
import removeLastS from '@utils/removeLastS';

import Sidebar from './sidebar/sidebar';

import Table from './table/table';
import { 
  FormCreate, 
  FormEdit, 
  FormView 
} from './forms/';

import Lock from '@assets/lock.svg'
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

  const [state, dispatch] = useReducer(reducer, {
    id,
    show: false,
    title: null,
    Form: null,
  });

  const closeModal = () => {
    dispatch({ type: "close" });
  };

  const {
    setContent,
    modal,
  } = useModal({
    styles,
    isVisible: state.show,
    onClose: closeModal,
  });

  const [filterOptions, setFilterOptions] = useState({});

  useEffect(() => {
    setContent(
      <>
        <CloseButton
          onClick={closeModal}
          styles={styles}
        />

        <ModalHeader
          title={state.title}
          styles={styles}
        />

        <div className={styles.modalBody}>
          {state.Form ? <state.Form /> : null}
        </div>
      </>
    );
  }, [
    setContent,
    state.Form,
    state.title,
  ]);

  const filteredData = useMemo(() =>
    filter(data, filterOptions)
  ,[data, filterOptions]);

  const hasData = (data?.length ?? 0) > 0;
  const hasResults = filteredData.length > 0;
  const hasActiveFilters =
    Object.keys(filterOptions).length > 0;

  const pluralLabel = firstCharUppercase(id);
  const singularLabel = removeLastS(pluralLabel);

  const openCreateModal = () => {
    dispatch({ type: "create" });
  };

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
      <main className={styles.dataTable}>
        <div
          className={`${styles.workspace} ${
            hasData
              ? styles.workspaceWithSidebar
              : styles.workspaceWithoutSidebar
          }`}
        >
          {hasData && <Sidebar />}

          <section className={styles.content}>
            {hasResults ? (
              <div
                className={styles.tableWrapper}
                role="region"
                aria-label={`${pluralLabel} table`}
                tabIndex={0}
              >
                <Table
                  headers={headers}
                  data={filteredData}
                />
              </div>
            ) : (
              <EmptyState
                isFiltered={hasData && hasActiveFilters}
                allowed={allowed}
                pluralLabel={pluralLabel}
                singularLabel={singularLabel}
                onClearFilters={() => setFilterOptions({})}
                onCreate={openCreateModal}
                styles={styles}
              />
            )}
          </section>

          {allowed && hasResults && (
            <CreateButton
              onClick={openCreateModal}
              styles={styles}
              label={`Create new ${singularLabel}`}
            >
              {`New ${singularLabel}`}
            </CreateButton>
          )}

          {modal}
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

const EmptyState = ({
  isFiltered,
  allowed,
  pluralLabel,
  singularLabel,
  onClearFilters,
  onCreate,
  styles,
}) => {
  const title = isFiltered
    ? `No matching ${pluralLabel.toLowerCase()}`
    : `No ${pluralLabel.toLowerCase()} yet`;

  const description = isFiltered
    ? "Try clearing your filters or changing the selected options."
    : allowed
      ? `Create your first ${singularLabel.toLowerCase()} to get started.`
      : "There are currently no entries available.";

  return (
    <div
      className={styles.noData}
      role="status"
      aria-live="polite"
    >
      <div className={styles.emptyCard}>
        <div className={styles.emptyIllustration}>
          <EmptyBox className={styles.emptyBox} />
        </div>

        <div className={styles.emptyCopy}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        {(isFiltered || allowed) && (
          <div className={styles.emptyActions}>
            {isFiltered && (
              <button
                type="button"
                className={styles.emptySecondaryButton}
                onClick={onClearFilters}
              >
                Clear filters
              </button>
            )}

            {allowed && (
              <button
                type="button"
                className={styles.emptyPrimaryButton}
                onClick={onCreate}
              >
                <Plus aria-hidden="true" />

                <span>
                  Create {singularLabel}
                </span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const CreateButton = ({
  children,
  onClick,
  styles,
  label,
}) => {
  return (
    <div className={styles.create}>
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
      >
        <Plus />
      </button>

      <div>{children}</div>
    </div>
  );
};

const CloseButton = ({ onClick, styles }) => {
  return (
    <button
      type="button"
      className={styles.close}
      onClick={onClick}
      aria-label="Close modal"
    >
      <CloseBtn />
    </button>
  );
};

const ModalHeader = ({ title, styles }) => (
  <div className={styles.header}>
    <header>{title}</header>
  </div>
)

export default DataTable;