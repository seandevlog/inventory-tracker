import styles from './Table.module.css';

const Table = ({ headers }) => (
  <table className={styles.table}>
    <thead>
      <tr>
        {headers}
      </tr>
    </thead>
    <tbody>

    </tbody>
  </table>
)

export default Table;