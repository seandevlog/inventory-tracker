import { useContext } from 'react';
import styles from './row.module.css';
import MainContext from '@contexts/main.context';

const Row = ({ id, className, onClick, sort, data: row }) => {
  const { FeaturePlaceholder } = useContext(MainContext);
  
  return (
    <tr
      id={id}
      className={styles[className]}
      onClick={onClick ? () => onClick(id) : null}
    >
      {sort.map(attr => {
        if (attr === 'feature') {
          return (
            <td key={attr}>
              {row.feature?.url
              ? <img src={row.feature.url}></img>
              : <FeaturePlaceholder/>}
              {/* TODO - find a way to make default feature work for all other feature */}
            </td>
          )
        }
          return (<td key={attr}>{row[`${attr}`]}</td>)
        }
      )}
    </tr>
  )
}

export default Row;