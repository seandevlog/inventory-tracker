import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { sortBy, orderBy } from 'lodash';
import styles from './Table.module.css';
import TableHeaderSort from './TableHeaderSort/TableHeaderSort';
import TableRow from './TableRow/TableRow';
import sortOptions from './TableHeaderSort/TableHeaderSort.config';

const Table = ({ headers, children }) => {
  const navigate = useNavigate();

  const [sortAttr, setSortAttr] = React.useState('');

  const [sortState, setSortState] = React.useState(sortOptions.NOSORT);

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
    ? sortBy(children, sortAttr) 
    : sortAttr && sortState === sortOptions.DESCENDING
    ? orderBy(children, sortAttr, ['desc'])
    : children; 
  
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {sortedHeaderObjectsArray.map(header => header.sort 
            ? (<TableHeaderSort
                key={header.attribute}
                onSort={() => handleSort(header.attribute)}
                sortState={sortAttr === header.attribute && sortState}
              >
                {header.value}
              </TableHeaderSort>)
            : <th key={header.attribute}>{header.value}</th>
          )}
        </tr>
      </thead>
      <tbody>
        {rows
          ? rows.map(row => (
            <TableRow 
              key={row._id}
              id={row._id}
              className="filled"
              onClick={() => navigate(`${row._id}`)}
              sort={sortedHeaderAttributes}
              data={row}
            />
          ))
          : <tr><td colSpan={6}>No User Data Found</td></tr>
        }
      </tbody>
    </table>
  )
} 

export { TableHeaderSort, TableRow };
export default Table;