import { 
  Form,
  useNavigate,
  useOutletContext
} from 'react-router-dom';
import styles from './form.module.css';
import firstCharUppercase from '@utils/firstCharUppercase';

const FormView = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`edit`, { relative: 'path' })
  };

  const {
    FeaturePlaceholder,
    inputs,
    data
  } = useOutletContext();

  return (
    <Form
      method="post"
      encType="multipart/form-data"
    >
      <fieldset className={styles.feature}>
        <div>
          {data[0].feature?.url
            ? <img src={data[0].feature?.url}/>
            : <FeaturePlaceholder/>
          }
        </div>
      </fieldset>
      <fieldset className={styles.form}>
        <legend></legend>
        <div>
          <div className={styles.text}>
            {inputs.map(({id, type, label, defaultValue, options}) => (
              (typeof options === 'undefined' && type !== 'date' && type !== 'password') &&
              <div key={id}>
                <span><p>{label}</p></span>
                <span id={id}><p>{
                  defaultValue || data[0][id]
                  ? (typeof defaultValue === 'string' || typeof data[0][id] === 'string') 
                    ? firstCharUppercase(defaultValue || data[0][id])
                    : defaultValue || data[0][id]
                  : 'Empty'
                }</p></span>
              </div>
            ))}
          </div>
          <div className={styles.option}>
            {inputs.map(({id, label, options}) => {
              return (
              options && options?.length > 0 &&
              <div key={id}>
                <span><p>{label}</p></span>
                <span id={id}><p>{
                  data[0][id]
                  ? (typeof data[0][id] === 'string') 
                    ? firstCharUppercase(data[0][id])
                    : data[0][id]
                  : 'Empty'
                }</p></span>
              </div>
            )})}
          </div>
          <div className={styles.date}>
            {inputs.map(({id, type, label}) => (
              type === 'date' &&
              <div key={id}>
                <span><p>{label}</p></span>
                <span id={id}><p>{new Date(data[0][id]).toLocaleDateString(undefined, {
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
        <button 
          type="button"
          className='btn'
          onClick={handleNavigate}
        >
          Edit
        </button>
      </div>
    </Form>
  )
}

export default FormView;