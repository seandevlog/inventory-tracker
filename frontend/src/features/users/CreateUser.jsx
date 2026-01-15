import { createPortal } from "react-dom";
import { Modal } from "../../components/index";

const CreateUser = () => (
  <div>
    {createPortal(
      <Modal
        showDeleteButton={false}
      >
        Create User
      </Modal>,
      document.body
    )}
  </div>
)

export default CreateUser;