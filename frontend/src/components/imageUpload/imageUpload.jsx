import {
  useRef,
  useEffect,
  useState
} from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { filter } from 'lodash';
import styles from './imageUpload.module.css';
import ErrorBox from '@components/errorBox/errorBox';

const ImageUpload = ({ disabled, ImagePlaceholder }) => {
  const {
    data: groupData
  } = useOutletContext();
  const params = useParams();
  const paramId = params ? Object.values(params)?.[0] : ''; 

  const data = filter(groupData, { _id: paramId }) 

  const currentFeature = data ? data?.[0]?.feature?.url : '';

  const [feature, setFeature] = useState(currentFeature);
  const [errorBox, setErrorBox] = useState(false);

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

  const fileInputRef = useRef('');

  useEffect(() => {
    fileInputRef.value = '';
    return () => URL.revokeObjectURL(feature);
  })

  return (
    <fieldset className={styles.feature}>
      <legend></legend>
      {feature 
        ? <img src={feature}/>
        : <ImagePlaceholder/>
      }
      <div className={styles.fileInput}>
        <label htmlFor="feature">Upload File</label>
        <input 
          id="feature"
          type="file" 
          name="feature" 
          disabled={disabled ?? false}
          onChange={handleFeature}
          ref={fileInputRef}
        />
      </div>
      <input 
        type="hidden" 
        name="public_id" 
        value={data?.feature?.public_id} 
        disabled={!data?.feature?.public_id}
      />
      {errorBox && 
        <ErrorBox>
          Only accepts PNG, JPG, JPEG
        </ErrorBox>
      }
    </fieldset>
  )
}

export default ImageUpload;