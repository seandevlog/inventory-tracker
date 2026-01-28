import { 
  Form as ReactForm,
  useNavigate
} from 'react-router-dom';
import Form from './form';

const FormView = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`edit`, { relative: 'path' })
  };

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
          onClick={handleNavigate}
        >
          Edit
        </button>
      </div>
    </ReactForm>
  )
}

export default FormView;