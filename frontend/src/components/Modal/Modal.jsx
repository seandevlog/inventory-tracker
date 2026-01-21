import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './modal.module.css';
import actions from './modal.actions';
import reducer from './modal.reducer';

import BackButton from './backButton/backButton';
import ModalForm from './form/form';

const Modal = ({ children, data, mode, Info, schema }) => {
  const navigate = useNavigate();
  
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

  return state.show && (
    <div
      onClick={handleCloseWithBackground}
    >
      <div className={styles.modal}>
        <BackButton 
          className="modalClose"
          onClose={handleCloseButton}
        />
        <header>{children}</header>
            
        <ModalForm 
          mode={mode} 
          schema={schema} 
          data={data}
          Info={Info}
        />
      </div>
    </div>
  )
}

export default Modal;