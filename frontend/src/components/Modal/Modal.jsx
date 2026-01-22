import * as React from 'react';
import { createPortal } from 'react-dom';
import { 
  useNavigate,
  useParams,
  useOutletContext 
} from 'react-router-dom';
import { filter } from 'lodash';

import styles from './modal.module.css';
import actions from './modal.actions';
import reducer from './modal.reducer';

import BackButton from './backButton/backButton';
import ModalForm from './form/form';

const Modal = ({ mode, title }) => {
  const params = useParams(); 
  const navigate = useNavigate();
  const { 
    schema, 
    data: groupData,
    paramId,
    inputs
  } = useOutletContext();

  const [ data ] = filter(groupData, { '_id': params[`${paramId}`] })
  
  const [state, dispatch] = React.useReducer(reducer, {
    show: true,
    data: {}
  })

  const handleCloseWithBackground = (event) => {
    if (event.currentTarget === event.target)
      dispatch({ type: actions.CLOSE });
  }

  const handleCloseButton = () => {
    dispatch({ type: actions.CLOSE });
  }

  React.useEffect(() => {
    if (!state.show)
      navigate('/users'); 
  }, [state.show, navigate])

  return state.show && createPortal(
    <div
      onClick={handleCloseWithBackground}
    >
      <div className={styles.modal}>
        <BackButton 
          className="modalClose"
          onClose={handleCloseButton}
        />
        <header>{title}</header>
            
        <ModalForm 
          mode={mode} 
          schema={schema} 
          data={data}
          inputs={inputs}
        />
      </div>
    </div>,
    document.body
  )
}

export default Modal;