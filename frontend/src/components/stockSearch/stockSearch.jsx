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

  return (items && locations && items?.length > 0 && locations?.length > 0
    ? <div className={styles.stockSearch}>
      <span>Lookup a stock of an item by typing the SKU and Location code</span>
      <div>
        <SearchBarInput
          id='SKU'
          data={currentItemsSKU}
          select={itemInput}
          setSelect={setItemInput}
        />
        <SearchBarInput
          id='Location Code'
          data={currentLocationsCode}
          select={locationInput}
          setSelect={setLocationInput}
        />
        <span>
          {typeof itemInput !== 'undefined' && itemInput && typeof locationInput !== 'undefined' && locationInput &&
            ((typeof fromLocationTransactions !== 'undefined' && fromLocationTransactions.length <= 0) ||
            (typeof toLocationTransactions !== 'undefined' && toLocationTransactions.length <=0))
          ? <> 
              <p>Both Inputs</p>
              <p>Invalid</p>
            </>
          : typeof itemInput !== 'undefined' && itemInput && 
              ((typeof fromLocationTransactions !== 'undefined' && fromLocationTransactions.length <= 0) ||
              (typeof toLocationTransactions !== 'undefined' && toLocationTransactions.length <=0))
          ? <> 
              <p>Invalid Input</p>
              <p>SKU</p>
            </>
          : typeof locationInput !== 'undefined' && locationInput && 
            ((typeof fromLocationTransactions !== 'undefined' && fromLocationTransactions.length <= 0) ||
            (typeof toLocationTransactions !== 'undefined' && toLocationTransactions.length <=0))
          ? <> 
              <p>Invalid Input</p>
              <p>Location</p>
            </>
          : <>
              <p>Current Stock</p>
              <p>{isNaN(newStock) ? 'No Result' : newStock}</p>
            </>
          }
        </span>
      </div>
    </div>
    : <div className={styles.noData}>
      <span>Peekaboo! Create Locations & Items first to access this feature</span>
    </div>
  )
}

export default StockSearch