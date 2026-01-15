import { createPortal } from "react-dom";
import { useLoaderData} from "react-router-dom";
import { Modal } from "../../components";
import modalModes from "../../components/Modal/Modal.modes";

const UserModal = ({ mode }) => {
  const user = useLoaderData();

  const config = 
    mode === 'edit'
    ? {
        mode: modalModes.EDIT,
        title: 'Edit',
        user: user
      }
    : mode === 'create'
    ? {
        mode: modalModes.CREATE,
        title: 'Create'
      }
    : mode === 'view' 
    ? {
        mode: modalModes.VIEW,
        title: 'View',
        user: user
      }
    : {}

  return (
    <>
      {createPortal(
        <Modal
          data={config.user}
          mode={config.mode}
        >
          {config.title} User
        </Modal>,
        document.body
      )}
    </>
  )
}

export default UserModal;