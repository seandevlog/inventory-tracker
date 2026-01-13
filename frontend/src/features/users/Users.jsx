import Modal from '../../components/Modal';
import Filter from '../../components/Filter';
import CreateButton from '../../components/CreateButton';
import HeaderSort from '../../components/HeaderSort';

const Users = () => {
  return (
    <>
      <Filter/>
      <CreateButton>New User</CreateButton>
      <table>
        <thead>
          <tr>
            <th>Img</th>
            <HeaderSort>Username</HeaderSort>
            <HeaderSort>Given Name</HeaderSort>
            <HeaderSort>Family Name</HeaderSort>
            <HeaderSort>Contact</HeaderSort>
            <HeaderSort>Address</HeaderSort>
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