import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import { 
  FilterSelect, 
  CreateButton,
  Table,
} from '../../components/index'

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
        headers={[
          { value: 'Profile', sort: false},
          { value: 'Username', sort: true, attribute: 'username'},
          { value: 'Given Name', sort: true, attribute: 'givenName'},
          { value: 'Family Name', sort: true, attribute: 'familyName'},
          { value: 'Contact', sort: true, attribute: 'contact'},
          { value: 'Address', sort: true, attribute: 'address'},
        ]}
      >
        {users.length > 0 && users.map(user => {
          for (const [key, value] of Object.entries(user)) {
            if (key !== 'password') {
              return 
            }
          }
          
        })}
      </Table>
      <Outlet />
    </>
  )
}

export default Users