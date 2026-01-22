import styles from './feature.module.css';
import PlaceholderImage from '@components/placeholderImage/placeholderImage';
import PlaceholderImageConfig from '@components/placeholderImage/placeholderImage.config';

const Feature = ({ data, disabled }) => {
  return (
    <fieldset className={styles.feature}>
      <legend>Feature</legend>
      {data?.profile?.url
        ? <img 
            src={data.profile.url}
          />
        : <PlaceholderImage
            className="FeatureImage"
            config={PlaceholderImageConfig.PORTRAIT}
          />
      }
      <div className={styles.input}>
        <input type="file" name="profile" disabled={disabled}/>
      </div>
      <input type="hidden" name="public_id" value={data?.profile?.public_id} disabled={!data?.profile?.public_id}/>
    </fieldset>
  )
}

export default Feature;