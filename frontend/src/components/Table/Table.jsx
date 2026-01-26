import {
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { sortBy, orderBy } from 'lodash';
import styles from './table.module.css';
import HeaderSort from './headerSort/headerSort';
import Row from './row/row';
import sortOptions from './headerSort/headerSort.config';

const Table = ({ data, headers }) => {

  const navigate = useNavigate();

  const [sortAttr, setSortAttr] = useState('');

  const [sortState, setSortState] = useState(sortOptions.NOSORT);

  const handleSort = (attribute) => {
    if (attribute !== sortAttr) {
      setSortAttr(attribute);
      setSortState(sortOptions.ASCENDING);
      return;
    }

    if (sortState === sortOptions.NOSORT) {
      setSortState(sortOptions.ASCENDING);
    } else if (sortState === sortOptions.ASCENDING) {
      setSortState(sortOptions.DESCENDING);
    } else {
      setSortState(sortOptions.NOSORT);
    }
  };

  const sortedHeaderObjectsArray = sortBy(headers, ['index']);
  const sortedHeaderAttributes = sortedHeaderObjectsArray.map(sortedHeader => (sortedHeader.attribute));
  const rows = 
    sortAttr && sortState === sortOptions.ASCENDING
    ? sortBy(data, sortAttr) 
    : sortAttr && sortState === sortOptions.DESCENDING
    ? orderBy(data, sortAttr, ['desc'])
    : data; 
  
  return rows && rows.length > 0 ? (
    <table className={styles.table}>
      <thead>
        <tr>
          {sortedHeaderObjectsArray.map(header => header.sort 
            ? (<HeaderSort
                key={header.attribute}
                onSort={() => handleSort(header.attribute)}
                sortState={sortAttr === header.attribute && sortState}
              >
                {header.value}
              </HeaderSort>)
            : <th key={header.attribute}>{header.value}</th>
          )}
        </tr>
      </thead>
      <tbody>
        {rows && rows.length > 0
          ? rows.map(row => (
            <Row 
              key={row._id}
              id={row._id}
              className="filled"
              onClick={() => navigate(`${row._id}`)}
              sort={sortedHeaderAttributes}
              data={row}
            />
          ))
          : []
        }
      </tbody>
    </table>
  ) : (<div className={styles.noData}>New here? Create data with the button at the top right</div>)
} 

export default Table;