import styles from './TableRow.module.css';

const TableRow = ({ id, className, children, onClick }) => (
  <tr
    id={id}
    className={styles[className]}
    onClick={onClick ? () => onClick(id) : null}
  >
    {children}
  </tr>
)

export default TableRow;