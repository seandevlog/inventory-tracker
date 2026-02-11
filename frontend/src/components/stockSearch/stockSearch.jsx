import { 
  useState, 
  useMemo,
  useContext,
} from 'react';

import styles from './stockSearch.module.css';

import { filter } from 'lodash';

import SearchBarInput from '@components/searchBarInput/searchBarInput';

import AppContext from '@contexts/app.context';

const StockSearch = () => {
  const { items, locations, transactions } = useContext(AppContext);

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

  
  const isValidItem = useMemo(() => 
    items && items.length > 0 && items.reduce((acc, {sku}) => acc || sku === itemInput, false)
  , [itemInput, items]);

  const isValidLocation = useMemo(() => 
    locations && locations.length > 0 && locations.reduce((acc, {code}) => acc || code === locationInput, false)
  , [locationInput, locations]);

  return (items && locations && items?.length > 0 && locations?.length > 0
    ? <div className={styles.stockSearch}>
      <div>
        <span>Lookup a stock of an item by typing the SKU and Location code</span>
        <div>
          <SearchBarInput
            id='SKU'
            data={currentItemsSKU}
            submitted={itemInput}
            setSubmitted={setItemInput}
          />
          <SearchBarInput
            id='Location Code'
            data={currentLocationsCode}
            submitted={locationInput}
            setSubmitted={setLocationInput}
          />
        </div>
      </div>
      <span>
        {!isValidLocation && !isValidItem
        ? <> 
            <p>Both Inputs</p>
            <p>Invalid</p>
          </>
        : !isValidItem
        ? <> 
            <p>Invalid Input</p>
            <p>SKU</p>
          </>
        : !isValidLocation
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
    : <div className={styles.noData}>
      <span>Peekaboo! Create Locations & Items first to access this feature</span>
    </div>
  )
}

export default StockSearch