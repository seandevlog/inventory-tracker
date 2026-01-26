import { 
  Form as ReactForm,
  useOutletContext,
} from 'react-router-dom';

const FormCreate = () => {
  const { Form } = useOutletContext();

  return (
    <ReactForm
      method="post"
      encType="multipart/form-data"
    >
      <Form/>
      <div>
        <button 
          type="submit"
          name="intent"
          value="save"
          className="btn"
        >
          Save
        </button>
      </div>
    </ReactForm>
  )
}

export default FormCreate;