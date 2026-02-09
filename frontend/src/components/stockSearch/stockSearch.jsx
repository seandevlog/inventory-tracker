import { 
  useState, 
  useMemo,
  useContext,
} from 'react';

import styles from './stockSearch.module.css';

import { filter } from 'lodash';

import SearchBarInput from '@components/searchBarInput/searchBarInput';

import ManageContext from '@contexts/manage.context';

const StockSearch = () => {
  const { items, locations, transactions } = useContext(ManageContext);

  const [itemInput, setItemInput] = useState(null);
  const [locationInput, setLocationInput] = useState(null);

  const currentItemsSKU = useMemo(() => 
    items?.map(({ sku }) => sku), 
  [items]);

  const currentLocationsCode = useMemo(() => 
    locations?.map(({ code }) => code), 
  [locations])

  const fromLocationTransactions = useMemo(() => 
    transactions && filter(transactions, { item: { sku: itemInput }, fromLocation: { code: locationInput }})
  , [itemInput, locationInput, transactions])

  const toLocationTransactions = useMemo(() => 
    transactions && filter(transactions, { item: { sku: itemInput }, toLocation: { code: locationInput }})
  , [itemInput, locationInput, transactions])

  const increaseStock = useMemo(() => 
    toLocationTransactions?.reduce((accumulator, { qty }) => 
      accumulator + qty
    , 0),
  [toLocationTransactions])

  const reduceStock = useMemo(() => 
    fromLocationTransactions?.reduce((accumulator, { qty }) => 
      accumulator + qty
    , 0),
  [fromLocationTransactions])

  const newStock = useMemo(
    () => increaseStock - reduceStock,
  [increaseStock, reduceStock]);

  return (
    <div className={styles.stockSearch}>
      <SearchBarInput
        id='item'
        data={currentItemsSKU}
        select={itemInput}
        setSelect={setItemInput}
      />
      <SearchBarInput
        id='location'
        data={currentLocationsCode}
        select={locationInput}
        setSelect={setLocationInput}
      />
      <span>
        <p>Current Stock</p>
        <p>{isNaN(newStock) ? 'No Result' : newStock}</p>
      </span>
    </div>
  )
}

export default StockSearch