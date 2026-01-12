import { Filter, Create, SortHeader, Modal } from '../manage.components'

const Users = () => {
  return (
    <>
      <Filter/>
      <Create>New User</Create>
      <table>
        <thead>
          <tr>
            <th>Img</th>
            <SortHeader>Username</SortHeader>
            <SortHeader>Given Name</SortHeader>
            <SortHeader>Family Name</SortHeader>
            <SortHeader>Contact</SortHeader>
            <SortHeader>Address</SortHeader>
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
      <Modal
        action="/users/store"
      >
        Users
      </Modal>
    </>
  )
}

export default Users