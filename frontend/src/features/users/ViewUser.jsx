import { createPortal } from "react-dom";
import { useLoaderData } from "react-router-dom";
import { Modal } from "../../components";

const ViewUser = () => {
  const user = useLoaderData();

  return (
    <>
      {createPortal(
        <Modal
          showDeleteButton={true}
          data={user}
          disabled={true}
        >
          Update User
        </Modal>,
        document.body
      )}
    </>
  )
}

export default ViewUser;