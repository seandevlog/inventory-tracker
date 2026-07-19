import { useContext } from 'react';
import styles from './row.module.css';
import MainContext from '@contexts/dataTable.context';
import splitUppercase from '@utils/splitUppercase';

const Row = ({ id, className, onClick, sort, data: row }) => {
  const { FeaturePlaceholder } = useContext(MainContext);
  
  return (
    <tr
      id={id}
      className={styles[className]}
      onClick={onClick ? () => onClick(id) : undefined}
      onKeyDown={(event) => {
        if (
          onClick &&
          (event.key === "Enter" || event.key === " ")
        ) {
          event.preventDefault();
          onClick(id);
        }
      }}
      tabIndex={onClick ? 0 : undefined}
    >
      {sort && sort?.map(attr => {
        if (attr === 'feature') {
          return (
            <td key={attr}>
              {row?.feature?.url
              ? <img
                  src={row.feature.url}
                  alt={`${row?.name ?? "Item"} feature`}
                />
              : <FeaturePlaceholder/>}
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

        const value = row?.[attr];

        return (
          <td key={attr}>
            {value === null || value === undefined
              ? ""
              : splitUppercase(String(value))}
          </td>
        );
      })}
    </tr>
  )
}

export default Row;
