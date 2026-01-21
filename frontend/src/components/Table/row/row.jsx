import styles from './row.module.css';
import FeatureImage from '@components/featureImage/featureImage';

const Row = ({ id, className, onClick, sort, data: row }) => (
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
            : <FeatureImage />}
            {/* TODO - find a way to make default profile work for all other feature */}
          </td>
        )
      }
        return (<td key={attr}>{row[`${attr}`]}</td>)
      }
    )}
  </tr>
)

export default Row;