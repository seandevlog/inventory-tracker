import * as React from 'react';
import { Form, useNavigate } from 'react-router-dom';
import styles from './Modal.module.css';
import RegisterInputs from "../../features/auth/Register/RegisterInputs/RegisterInputs";
import BackButton from './ModalBackButton/BackButton';
import ModalUserIcon from './ModalUserIcon/ModalUserIcon';
import modes from './Modal.modes';
import ModalStatusSelect from './ModalStatusSelect/ModalStatusSelect';

const modalActions = {
  CREATE: 'create',
  UPDATE: 'update',
  CLOSE: 'close'
}

const Modal = ({ children, data, mode }) => {
  const navigate = useNavigate();

  const config = 
    mode === modes.VIEW
    ? {
        hideDeleteButton: true,
        hideSaveButton: true,
        hideEditButton: false,
        disableInputs: true
      }
    : mode === modes.CREATE
    ? {
        hideDeleteButton: true,
        hideSaveButton: false,
        hideEditButton: true,
        disableInputs: false
      }
    : mode === modes.EDIT
    ? {
        hideDeleteButton: false,
        hideSaveButton: false,
        hideEditButton: true,
        disableInputs: false
      }
    : {}
  
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
            {data?.profile?.url
              ? <img src={data.profile.url}></img>
              : <ModalUserIcon className="modalUserIcon"/>
            }
            <input type="file" name="profile" disabled={config.disableInputs}/>
            <input type="hidden" name="public_id" value={data?.profile?.public_id} disabled={!data?.profile?.public_id}/>
          </fieldset>
          <div className={styles.formDiv}>
            <fieldset className={styles.formInfo}>
              <legend>Info</legend>
              <RegisterInputs 
                className="modalFormInfo"
                disabled={config.disableInputs}
              >
                {data || null}
              </RegisterInputs>
            </fieldset>
            <fieldset className={styles.status}>
              <legend>Status</legend>
              <ModalStatusSelect 
                disabled={config.disableInputs}
              >
                {data?.isActive}
              </ModalStatusSelect>
            </fieldset>
          </div>
          <div className={styles.modalButtons}>
            {/* TODO - convert into one same component */}
            {config.hideSaveButton || <button 
              type="submit"
              name="intent"
              value="save"
              className="btn"
              disabled={config.hideSaveButton}
            >
              Save
            </button>}
            {config.hideEditButton || <button 
              type="submit"
              name="intent"
              value="edit"
              className="btn"
              disabled={config.hideEditButton}
            >
              Edit
            </button>}
            {config.hideDeleteButton || <button 
              type="submit" 
              name="intent"
              value="delete"
              className="btn"
              disabled={config.hideDeleteButton}
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