import * as React from 'react';
import styles from './feature.module.css';
import PlaceholderImage from '@components/placeholderImage/placeholderImage';
import PlaceholderImageConfig from '@components/placeholderImage/placeholderImage.config';
import ErrorBox from '@components/errorBox/errorBox';

const Feature = ({ data, disabled }) => {
  const currentFeature = data?.feature?.url;

  const [feature, setFeature] = React.useState(currentFeature);
  const [errorBox, setErrorBox] = React.useState(false);

  const handleFeature = (event) => {
    if (event.target.files[0]?.type === 'image/png' ||
      event.target.files[0]?.type === 'image/jpg' ||
      event.target.files[0]?.type === 'image/jpeg'
    ) {
      setErrorBox(false);
      setFeature(URL.createObjectURL(event.target.files[0]));
    } else {
      setErrorBox(true);
    }
  }

  React.useEffect(() => {
    return () => URL.revokeObjectURL(feature);
  })

  return (
    <fieldset className={styles.feature}>
      <legend></legend>
      {feature 
      ? <img 
          src={feature}
        />
      : <PlaceholderImage
          className="FeatureImage"
          config={PlaceholderImageConfig.PORTRAIT}
        />
      }
      <div className={styles.input}>
        <input 
          type="file" 
          name="feature" 
          disabled={disabled}
          onChange={handleFeature}
        />
      </div>
      <input type="hidden" name="public_id" value={data?.feature?.public_id} disabled={!data?.feature?.public_id}/>
      {errorBox && <ErrorBox>Only accepts PNG, JPG, JPEG</ErrorBox>}
    </fieldset>
  )
}

export default Feature;