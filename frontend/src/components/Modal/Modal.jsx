import styles from './Modal.module.css';
import RegisterInputs from "../../features/auth/Register/RegisterInputs/RegisterInputs";
import BackButton from './ModalBackButton/BackButton';
import ModalUserIcon from './ModalUserIcon/ModalUserIcon';

const Modal = ({ children, action, state }) => {
  return (
    <div className="hide">
      <div className={styles.modal}>
        <BackButton className="modalClose"/>
        <header>{children}</header>
            
        <form action={action} className={styles.form} encType="multipart/form-data">
          <fieldset className={styles.formFile}>
            <legend>Profile</legend>
            <ModalUserIcon className="modalUserIcon"/> {/* temp image */}
            <input type="file" id="profile" name="profile"/>
          </fieldset>
          <div className={styles.formDiv}>
            <fieldset className={styles.formInfo}>
              <legend>Info</legend>
              <RegisterInputs className="modalFormInfo"/>
            </fieldset>
            <fieldset>
              <legend>Status</legend>
              <label htmlFor="status">Current Status</label>
              <select id="status" name="status" data-selected="active" required>
                <option value="active" selected>Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </fieldset>
          </div>
          <div className={styles.modalButtons}>
            <button type="submit" id="save" className="btn">Save</button>
            <button type="button" id="delete" className="btn">Delete</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Modal;