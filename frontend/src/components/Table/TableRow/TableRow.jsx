import styles from './TableRow.module.css';

const TableRow = ({ id, children, onClick }) => (
  <tr
    id={id}
    className={styles.row}
    onClick={(id) => onClick(id)}
  >
    {children}
  </tr>
)

export default TableRow;