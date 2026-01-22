import styles from './placeholderImage.module.css';
import config from './placeholderImage.config';

const PlaceholderImage = ({ className, config: _config }) => {
  switch (_config) {
    case config.PORTRAIT:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 340 340" className={styles[className]}>
        <path fill="#DDD" d="m169,.5a169,169 0 1,0 2,0zm0,86a76,76 0 1
        1-2,0zM57,287q27-35 67-35h92q40,0 67,35a164,164 0 0,1-226,0"/>
        </svg>
      )
  } 
}

export default PlaceholderImage;