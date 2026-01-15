import * as React from 'react';
import { Form, useNavigate } from 'react-router-dom';
import styles from './Modal.module.css';
import RegisterInputs from "../../features/auth/Register/RegisterInputs/RegisterInputs";
import BackButton from './ModalBackButton/BackButton';
import ModalUserIcon from './ModalUserIcon/ModalUserIcon';

const modalActions = {
  CREATE: 'create',
  UPDATE: 'update',
  CLOSE: 'close'
}

const Modal = ({ children, showDeleteButton, data, disabled }) => {
  const navigate = useNavigate();

  const reducer = (state, action) => {
    switch (action.type) {
      case modalActions.CREATE: {
        return {
          ...state,
          show: true,
        }
      }
      case modalActions.EDIT: {
        return {
          ...state,
          show: true,
          data: { ...state.data, ...action.payload }
        }
      }
      case modalActions.CLOSE: {
        return {
          ...state,
          show: false,
          data: {}
        }
      }
    }
    throw Error(`Unknown action: ${action.type}`)
  }
  
  const [state, dispatch] = React.useReducer(reducer,
    {
      show: true,
      data: {}
    }
  )

  const handleWrapperClose = (event) => {
    if (event.currentTarget === event.target) {
      dispatch({ type: modalActions.CLOSE });
    }
  }

  const handleCloseButton = () => {
    dispatch({ type: modalActions.CLOSE });
  }

  React.useEffect(() => {
    if (!state.show)
      navigate('/users'); 
  }, [state.show, navigate])

  return state.show && (
    <div
      onClick={handleWrapperClose}
    >
      <div className={styles.modal}>
        <BackButton 
          className="modalClose"
          onClose={handleCloseButton}
        />
        <header>{children}</header>
            
        <Form
          method="post" 
          className={styles.form} 
          encType="multipart/form-data"
        >
          <fieldset className={styles.formFile}>
            <legend>Profile</legend>
            {data?.profile?.url || <ModalUserIcon className="modalUserIcon"/>}
            <input type="file" name="profile" disabled={disabled}/>
          </fieldset>
          <div className={styles.formDiv}>
            <fieldset className={styles.formInfo}>
              <legend>Info</legend>
              <RegisterInputs 
                className="modalFormInfo"
                disabled={disabled}
              >
                {data || null}
              </RegisterInputs>
            </fieldset>
            <fieldset className={styles.status}>
              <legend>Status</legend>
              <label htmlFor="status">Current Status</label>
              <select id="status" name="status" data-selected="active" required disabled={disabled}>
                <option value="active" selected>Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </fieldset>
          </div>
          <div className={styles.modalButtons}>
            <button 
              type="submit" 
              className="btn"
              disabled={disabled}
            >
              Save
            </button>
            {showDeleteButton && <button 
              type="button" 
              className="btn"
              // onClick =
              disabled={disabled}
            >
              Delete
            </button>}
          </div>
        </Form>
      </div>
    </div>
  )
}

export { BackButton, ModalUserIcon };
export default Modal;