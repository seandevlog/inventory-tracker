import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { sortBy } from 'lodash';
import styles from './Table.module.css';
import TableHeaderSort from './TableHeaderSort/TableHeaderSort';
import TableRow from './TableRow/TableRow';
import DefaultProfile from '../../features/users/DefaultProfile/DefaultProfile'

const Table = ({ headers, children: rows }) => {
  const navigate = useNavigate();

  const [sort, setSort] = React.useState('');

  const handleSort = (attribute) => {
    setSort(attribute);
  }

  console.log(sort);
  
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {headers.map(header => header.sort 
            ? (<TableHeaderSort
                key={header.attribute}
                onSort={() => handleSort(header.attribute)}
              >
                {header.value}
              </TableHeaderSort>)
            : <th key={header.attribute}>{header.value}</th>
          )}
        </tr>
      </thead>
      <tbody>
        {rows
          ? sort 
            ? sortBy(rows, sort).map(row => (
              <TableRow 
                key={row._id}
                id={row._id}
                className="filled"
                onClick={() => navigate(`${row._id}`)}
              >
                <td>
                  {row.profile?.url
                  ? <img src={user.profile.url}></img>
                  : <DefaultProfile />}
                  {/* TODO - find a way to make default profile work for all other feature */}
                </td>
                <td>{user.username}</td>
                <td>{user.givenName}</td>
                <td>{user.familyName}</td>
                <td>{user.contact}</td>
                <td>{user.address}</td>
              </TableRow>
            ))
            : 
          : <TableRow className="emptyRow"><td colSpan={6}>No User Data Found</td></TableRow>
        }
      </tbody>
    </table>
  )
}

export { TableHeaderSort, TableRow };
export default Table;