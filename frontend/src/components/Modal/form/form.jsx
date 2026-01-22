import { Form } from 'react-router-dom';
import config from './form.config';
import styles from './form.module.css';

import Feature from './feature/feature';
import Info from './info/info';
import Status from './status/status';

const ModalForm = ({ mode, schema, data, inputs }) => {
  const {
    hideDeleteButton,
    hideSaveButton,
    hideEditButton,
    disabled
  } = config(mode);

  return (
    <Form
      method="post" 
      className={styles.form} 
      encType="multipart/form-data"
    >
      <div className={styles.formDiv}>
        <Feature 
          data={data}
          disabled={disabled}
        />
      </div>
      <div className={styles.formDiv}>
        <Info 
          disabled={disabled}
          schema={schema}
          data={data}
          inputs={inputs}
        />
        <Status
          data={data}
          disabled={disabled}
        /> 
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