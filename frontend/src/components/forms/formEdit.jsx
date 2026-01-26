import { 
  Form as ReactForm,
  useNavigate,
  useLocation,
  useOutletContext
} from 'react-router-dom';

const FormEdit = () => {
  const { Form } = useOutletContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <ReactForm
      method="post"
      encType="multipart/form-data"
    >
      <Form />
      <div>
        <button 
          type="submit"
          className="btn"
        >
          Save
        </button>
        <button 
          type="submit" 
          className="btn"
          onClick={() => navigate(`${pathname}/delete`)}
        >
          Delete
        </button>
      </div>
    </ReactForm>
  )
}

export default FormEdit;