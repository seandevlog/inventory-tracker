import styles from './CreateButton.module.css';

const CreateButton = ({ children }) => (
  <button id="create" className={`${styles.create} btn`} href="#">{children}</button>
)

export default CreateButton;