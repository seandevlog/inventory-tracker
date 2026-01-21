import * as React from 'react';
import { createPortal } from "react-dom";
import { useRouteLoaderData, useParams } from "react-router-dom";
import { filter } from 'lodash';
import { Modal } from "../../components";
import modalModes from "../../components/Modal/Modal.modes";
import { userSchema } from '@my-org/shared/validators';
import UserInputs from "./UserInputs";

const UserModal = ({ mode }) => {
  const users = useRouteLoaderData('users');
  const params = useParams();
  const [ user ] = filter(users, { '_id': params.userId })

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
          schema={userSchema}
          Info={(<UserInputs schema={userSchema}/>)} 
        >
          {config.title} User
        </Modal>,
        document.body
      )}
    </>
  )
}

export default UserModal;