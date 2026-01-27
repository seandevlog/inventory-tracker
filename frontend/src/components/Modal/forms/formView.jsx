import { 
  Form as ReactForm,
  useNavigate
} from 'react-router-dom';
import Form from './form';

const FormView = () => {
  const navigate = useNavigate();

  return (
    <ReactForm
      method="post"
      encType="multipart/form-data"
    >
      <Form disabled={true}/>
      <div>
        <button 
          type="button"
          className="btn"
          onClick={() => navigate(`edit`, { relative: 'path' })}
        >
          Edit
        </button>
      </div>
    </ReactForm>
  )
}

export default FormView;