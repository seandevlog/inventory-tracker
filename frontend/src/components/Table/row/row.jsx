import { useContext } from 'react';
import styles from './row.module.css';
import MainContext from '@contexts/main.context';
import firstCharUppercase from '@utils/firstCharUppercase';
import splitUppercase from '@utils/splitUppercase';

const Row = ({ id, className, onClick, sort, data: row }) => {
  const { FeaturePlaceholder } = useContext(MainContext);
  
  return (
    <tr
      id={id}
      className={styles[className]}
      onClick={onClick ? () => onClick(id) : null}
    >
      {sort && sort?.map(attr => {
        if (attr === 'feature') {
          return (
            <td key={attr}>
              {row?.feature?.url
              ? <img src={row?.feature.url}></img>
              : <FeaturePlaceholder/>}
              {/* TODO - find a way to make default feature work for all other feature */}
            </td>
          )
        } else if (attr === 'createdAt') {
          return (
            <td key={attr}>
              {new Date(row?.createdAt).toLocaleDateString(undefined, {
                month: 'short',
                day: '2-digit',
                year: '2-digit',
                minute: '2-digit',
                hour: 'numeric'
              })}
            </td>
          )
        }

        return (<td key={attr}>{
          attr && row?.[attr] && splitUppercase(firstCharUppercase(row?.[attr]))
        }</td>)
      })}
    </tr>
  )
}

export default Row;