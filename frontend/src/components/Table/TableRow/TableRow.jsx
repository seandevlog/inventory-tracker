import styles from './TableRow.module.css';
import DefaultProfile from './DefaultProfile/DefaultProfile';

const TableRow = ({ id, className, onClick, sort, data: row }) => (
  <tr
    id={id}
    className={styles[className]}
    onClick={onClick ? () => onClick(id) : null}
  >
    {sort.map(attr => {
      if (attr === 'profile') {
        return (
          <td key={attr}>
            {row.profile?.url
            ? <img src={row.profile.url}></img>
            : <DefaultProfile />}
            {/* TODO - find a way to make default profile work for all other feature */}
          </td>
        )
      }
        return (<td key={attr}>{row[`${attr}`]}</td>)
      }
    )}
  </tr>
)

export default TableRow;