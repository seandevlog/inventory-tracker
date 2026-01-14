import styles from './Modal.module.css';
import RegisterInputs from "../../features/auth/Register/RegisterInputs/RegisterInputs";
import BackButton from './ModalBackButton/BackButton';
import ModalUserIcon from './ModalUserIcon/ModalUserIcon';

const Modal = ({ children, action, onWrapperClose, onButtonClose, showDeleteButton, onDelete, formData }) => {
  return (
    <div
      onClick={onWrapperClose}
    >
      <div className={styles.modal}>
        <BackButton 
          className="modalClose"
          onClose={onButtonClose}
        />
        <header>{children}</header>
            
        <form action={action} className={styles.form} encType="multipart/form-data">
          <fieldset className={styles.formFile}>
            <legend>Profile</legend>
            {formData.profile?.url || <ModalUserIcon className="modalUserIcon"/>}
            <input type="file" id="profile" name="profile"/>
          </fieldset>
          <div className={styles.formDiv}>
            <fieldset className={styles.formInfo}>
              <legend>Info</legend>
              <RegisterInputs 
                className="modalFormInfo"
              >
                {formData}
              </RegisterInputs>
            </fieldset>
            <fieldset className={styles.status}>
              <legend>Status</legend>
              <label htmlFor="status">Current Status</label>
              <select id="status" name="status" data-selected="active" required>
                <option value="active" selected>Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </fieldset>
          </div>
          <div className={styles.modalButtons}>
            <button 
              type="submit" 
              className="btn"
            >Save</button>
            {showDeleteButton && <button 
              type="button" 
              className="btn"
              onClick={onDelete}
            >
              Delete
            </button>}
          </div>
        </form>
      </div>
    </div>
  )
}

export { BackButton, ModalUserIcon };
export default Modal;