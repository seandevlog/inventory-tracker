import { 
  Form as ReactForm,
  useNavigate,
  useLocation,
  useParams,
  useOutletContext
} from 'react-router-dom';
import { filter } from 'lodash';

import { FormContext } from './context';

import config from './form.config';
import styles from './form.module.css';

import Feature from './feature/feature';
import Info from './info/info';
import Status from './status/status';

const Form = ({ mode }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const params = useParams();
  const paramId = Object.values(Object.values(params)[0])[0];  
  const {
    FeaturePlaceholder,
    data: groupData
  } = useOutletContext();
  
  const [ data ] = filter(groupData, { '_id': paramId })

  const {
    hideDeleteButton,
    hideSaveButton,
    hideEditButton,
    disabled
  } = config(mode);

  return (
    <FormContext.Provider value={{
      FeaturePlaceholder,
      paramId,
      data
    }}>
      <ReactForm
        method="post" 
        className={styles.form} 
        encType="multipart/form-data"
      >
        <div className={styles.formDiv}>
          <Feature 
            disabled={disabled}
          />
        </div>
        <div className={styles.formDiv}>
          <Info 
            disabled={disabled}
          />
          <Status
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
            type="button"
            className="btn"
            disabled={hideEditButton}
            onClick={() => navigate(`${pathname}/edit`)}
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
      </ReactForm>
    </FormContext.Provider>
  )
}

export default Form;