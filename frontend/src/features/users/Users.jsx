import * as React from 'react';
import { createPortal } from 'react-dom';
import { useLoaderData } from 'react-router-dom';
import { getAllUser, getUser } from './users.services';
import { 
  Modal, 
  FilterSelect, 
  CreateButton, 
  TableHeaderSort, 
  Table,
  TableRow 
} from '../../components/index'
import DefaultProfile from './DefaultProfile/DefaultProfile';

export const loader = async () => {
  const users = await getAllUser();

  return users;
}

const modalActions = {
  CREATE: 'create',
  UPDATE: 'update',
  CLOSE: 'close'
}

const Users = () => {
  const users = useLoaderData();

  const modalReducer = (state, action) => {
    switch (action.type) {
      case modalActions.CREATE: {
        return {
          ...state,
          show: true,
          title: 'Create User',
          showDeleteButton: false
        }
      }
      case modalActions.EDIT: {
        return {
          ...state,
          show: true,
          title: 'Edit User',
          showDeleteButton: true,
          data: { ...state.data, ...action.payload }
        }
      }
      case modalActions.CLOSE: {
        return {
          ...state,
          show: false
        }
      }
    }
    throw Error(`Unknown action: ${action.type}`)
  }

  const [modalState, modalDispatch] = React.useReducer(modalReducer, {
    show: false,
    title: '',
    showDeleteButton: false,
    data: {}
  })

  const handleCreateUser = () => {
    modalDispatch({ type: modalActions.CREATE });
  }

  const handleEditUser = async (id) => {
    const user = await getUser( id );
    modalDispatch({ 
      type: modalActions.EDIT,
      payload: user
    });
    console.log( id )
  }

  const handleDeleteUser = () => {
    modalDispatch({ type: modalActions.CLOSE });
  }

  const handleModalWrapperClose = (event) => {
    if (event.currentTarget === event.target) {
      modalDispatch({ type: modalActions.CLOSE });
    }
  }
  const handleModalButtonClose = () => {
    modalDispatch({ type: modalActions.CLOSE });
  }

  return (
    <>
      <FilterSelect/>
      <CreateButton
        onClick={handleCreateUser}
      >
        New User
      </CreateButton>
      <Table 
        headers={(
          <>
            <th>Img</th>
            <TableHeaderSort>Username</TableHeaderSort>
            <TableHeaderSort>Given Name</TableHeaderSort>
            <TableHeaderSort>Family Name</TableHeaderSort>
            <TableHeaderSort>Contact</TableHeaderSort>
            <TableHeaderSort>Address</TableHeaderSort>
          </>
        )}
      >
        {users 
          ? users.map(user => (
            <TableRow 
              key={user._id}
              id={user._id}
              onClick={handleEditUser}
            >
              <td>{user.profile?.url || <DefaultProfile />}</td>
              <td>{user.username}</td>
              <td>{user.givenName}</td>
              <td>{user.familyName}</td>
              <td>{user.contact}</td>
              <td>{user.address}</td>
            </TableRow>
          ))
          : 'No User Data Found'
        }
      </Table>
      {modalState.show && createPortal(
        <Modal
          action="/users/store"
          onWrapperClose={handleModalWrapperClose}
          onButtonClose={handleModalButtonClose}
          showDeleteButton={modalState.showDeleteButton}
          onDelete={handleDeleteUser}
          formData={modalState.data}
        >
          {modalState.title}
        </Modal>,
        document.body
      )}
    </>
  )
}

export default Users