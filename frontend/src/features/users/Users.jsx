import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import { 
  FilterSelect, 
  CreateButton, 
  TableHeaderSort, 
  Table,
  TableRow  
} from '../../components/index'
import DefaultProfile from './DefaultProfile/DefaultProfile';

const Users = () => {
  const users = useLoaderData();
  const navigate = useNavigate();

  return (
    <>
      <FilterSelect/>
      <CreateButton
        onClick={() => navigate('create')}
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
        {users.length > 0 
          ? users.map(user => (
            <TableRow 
              key={user._id}
              id={user._id}
              className="filled"
              onClick={() => navigate(`${user._id}`)}
            >
              <td>
                {user.profile?.url
                ? <img src={user.profile.url}></img>
                : <DefaultProfile />}
              </td>
              <td>{user.username}</td>
              <td>{user.givenName}</td>
              <td>{user.familyName}</td>
              <td>{user.contact}</td>
              <td>{user.address}</td>
            </TableRow>
          ))
          : <TableRow className="emptyRow"><td colSpan={6}>No User Data Found</td></TableRow>
        }
      </Table>
      <Outlet />
    </>
  )
}

export default Users