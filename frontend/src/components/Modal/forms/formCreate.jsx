import { 
  Form as ReactForm
} from 'react-router-dom';
import Form from './form';

const FormCreate = () => {
  return (
    <ReactForm
      method="post"
      encType="multipart/form-data"
    >
      <Form/>
      <div>
        <button 
          type="submit"
          className='btn'
        >
          Save
        </button>
      </div>
    </ReactForm>
  )
}

export default FormCreate;