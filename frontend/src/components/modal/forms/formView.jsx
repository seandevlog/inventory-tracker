import { useContext } from 'react';
import { 
  Form,
  useNavigate,
  useOutletContext
} from 'react-router-dom';
import styles from './formView.module.css';
import firstCharUppercase from '@utils/firstCharUppercase';
import AppContext from '@contexts/app.context';

const FormView = () => {
  const navigate = useNavigate();
  const { profile } = useContext(AppContext);
  const { role, username } = profile || {};

  const handleNavigate = () => {
    navigate(`edit`, { relative: 'path' })
  };

  const {
    FeaturePlaceholder,
    inputs,
    singleData
  } = useOutletContext();

  return (
    <Form
      method="post"
      encType="multipart/form-data"
    >
      <fieldset className={styles.feature}>
        {singleData[0]?.feature?.url
          ? <img src={singleData[0]?.feature?.url}/>
          : <FeaturePlaceholder/>
        }
      </fieldset>
      <fieldset className={styles.form}>
        <legend></legend>
        <div>
          <div className={styles.text}>
            {inputs && inputs?.map(({id, type, label, defaultValue, options}) => (
              (typeof options === 'undefined' && type !== 'date' && type !== 'password') &&
              <div 
                key={id}
                className={styles.info}
              >
                <span><p>{label}</p></span>
                <span id={id}><p>{
                  defaultValue || singleData?.[0]?.[id]
                  ? (typeof defaultValue === 'string' || typeof singleData[0]?.[id] === 'string') 
                    ? firstCharUppercase(defaultValue || singleData?.[0]?.[id])
                    : defaultValue || singleData?.[0]?.[id]
                  : 'Empty'
                }</p></span>
              </div>
            ))}
          </div>
          {inputs && inputs.filter(input => (
            typeof input.options !== 'undefined'
          )).length > 0 && 
            <div className={styles.option}>
              {inputs && inputs.map(({id, label, options}) => (
                options && options?.length > 0 &&
                <div 
                  key={id}
                  className={styles.info}
                >
                  <span><p>{label}</p></span>
                  <span id={id}><p>{
                    singleData?.[0]?.[id]
                    ? (typeof singleData?.[0]?.[id] === 'string') 
                      ? firstCharUppercase(singleData?.[0]?.[id])
                      : singleData?.[0]?.[id]
                    : 'Empty'
                  }</p></span>
                </div>
              ))}
            </div>
          }
          <div className={styles.text}>
            <div className={styles.info}>
              <span><p>Created By</p></span>
              <span 
                id='createdBy'
                name='createdBy'
              >
                <p>{singleData?.[0]?.createdBy ?? 'The universe, probably'}</p>
              </span>
            </div>
          </div>
          <div className={styles.date}>
            {inputs && inputs?.map(({id, type, label}) => (
              type === 'date' &&
              <div 
                key={id}
                className={styles.info}
              >
                <span><p>{label}</p></span>
                <span id={id}><p>{new Date(singleData?.[0]?.[id]).toLocaleDateString(undefined, {
                  weekday: 'long',
                  month: 'long',
                  day: '2-digit',
                  year: 'numeric',
                  minute: '2-digit',
                  hour: '2-digit'
                })}</p></span>
              </div>
            ))}
          </div>
        </div>
      </fieldset>
      <div>
        {(role === 'admin' || role === 'manager') &&
          <button 
            type="button"
            className='btn'
            onClick={handleNavigate}
          >
            Edit
          </button>
        }
      </div>
    </Form>
  )
}

export default FormView;