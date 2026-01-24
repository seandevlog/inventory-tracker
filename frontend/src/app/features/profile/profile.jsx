import { useNavigate, useLoaderData } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const loaderData = useLoaderData();
  const { user } = loaderData;
  console.log(loaderData)

  return (
    <>
      <div>This is my profile.</div>
      {user
        ? Object.entries(user).map(([key, value]) => (
            <div>{key}: {value}</div>
          ))
        : 'No Data Found'
      }
      <button
        onClick={() => navigate('/dashboard')}
      >
        Go Home
      </button>
    </>
  );
};

export default Profile;