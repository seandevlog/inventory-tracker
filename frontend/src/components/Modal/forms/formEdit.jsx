import { 
  Form as ReactForm
} from 'react-router-dom';
import Form from './form';

const FormEdit = () => {

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
          name="intent"
          value='update'
        >
          Save
        </button>
        <button 
          type='submit' 
          className="btn"
          name='intent'
          value='delete'
        >
          Delete
        </button>
      </div>
    </ReactForm>
  )
}

export default FormEdit;