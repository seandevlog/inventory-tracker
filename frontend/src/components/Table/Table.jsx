import styles from './Table.module.css';
import TableHeaderSort from './TableHeaderSort/TableHeaderSort';
import TableRow from './TableRow/TableRow';

const Table = ({ headers, children }) => (
  <table className={styles.table}>
    <thead>
      <tr>
        {headers}
      </tr>
    </thead>
    <tbody>
      {children}
    </tbody>
  </table>
)

export { TableHeaderSort, TableRow };
export default Table;