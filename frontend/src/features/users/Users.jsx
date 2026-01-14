import Modal from '../../components/Modal/Modal';
import Filter from '../../components/FilterSelect/FilterSelect';
import CreateButton from '../../components/CreateButton/CreateButton';
import TableHeaderSort from '../../components/Table/TableHeaderSort/TableHeaderSort';
import Table from '../../components/Table/Table';

const Users = () => {
  return (
    <>
      <Filter/>
      <CreateButton>New User</CreateButton>
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
      />
      <Modal
        action="/users/store"
      >
        Users
      </Modal>
    </>
  )
}

export default Users