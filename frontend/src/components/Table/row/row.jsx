import styles from './row.module.css';
import PlaceholderImage from '@components/placeholderImage/placeholderImage';
import PlaceholderImageConfig from '@components/placeholderImage/placeholderImage.config';

const Row = ({ id, className, onClick, sort, data: row }) => (
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
            : <PlaceholderImage config={PlaceholderImageConfig.PORTRAIT}/>}
            {/* TODO - find a way to make default feature work for all other feature */}
          </td>
        )
      }
        return (<td key={attr}>{row[`${attr}`]}</td>)
      }
    )}
  </tr>
)

export default Row;