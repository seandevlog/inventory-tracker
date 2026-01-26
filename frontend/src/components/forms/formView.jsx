import { 
  Form as ReactForm,
  useNavigate,
  useLocation,
  useOutletContext
} from 'react-router-dom';

const FormView = () => {
  const { Form } = useOutletContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();

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
          onClick={() => navigate(`${pathname}/edit`)}
        >
          Edit
        </button>
      </div>
    </ReactForm>
  )
}

export default FormView;