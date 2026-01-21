import { Form } from 'react-router-dom';
import config from './form.config';
import styles from './form.module.css';

import FeatureImage from '@components/featureImage/featureImage';
import ModalStatusSelect from '../statusSelect/statusSelect';

const ModalForm = ({ mode, schema, data, Info }) => {
  const {
    hideDeleteButton,
    hideSaveButton,
    hideEditButton,
    disableInputs
  } = config(mode);

  return (
    <Form
      method="post" 
      className={styles.form} 
      encType="multipart/form-data"
    >
      <fieldset className={styles.formFile}>
        <legend>Profile</legend>
        {data?.profile?.url
          ? <img src={data.profile.url}></img>
          : <FeatureImage className="FeatureImage"/>
        }
        <input type="file" name="profile" disabled={disableInputs}/>
        <input type="hidden" name="public_id" value={data?.profile?.public_id} disabled={!data?.profile?.public_id}/>
      </fieldset>
      <div className={styles.formDiv}>
        <fieldset className={styles.formInfo}>
          <legend>Info</legend>
          <Info className='modalFormInfo' disabled={disableInputs} schema={schema}>
            {data || null}
          </Info>
        </fieldset>
        <fieldset className={styles.status}>
          <legend>Status</legend>
          <ModalStatusSelect 
            disabled={disableInputs}
          >
            {data?.isActive}
          </ModalStatusSelect>
        </fieldset>
      </div>
      <div className={styles.modalButtons}>
        {/* TODO - convert into one same component */}
        {hideSaveButton || <button 
          type="submit"
          name="intent"
          value="save"
          className="btn"
          disabled={hideSaveButton}
        >
          Save
        </button>}
        {hideEditButton || <button 
          type="submit"
          name="intent"
          value="edit"
          className="btn"
          disabled={hideEditButton}
        >
          Edit
        </button>}
        {hideDeleteButton || <button 
          type="submit" 
          name="intent"
          value="delete"
          className="btn"
          disabled={hideDeleteButton}
        >
          Delete
        </button>}
      </div>
    </Form>
  )
}

export default ModalForm;