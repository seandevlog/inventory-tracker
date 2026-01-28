import { useNavigate, useLoaderData } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const loaderData = useLoaderData();
  const { profile } = loaderData;

  return (
    <>
      <div>This is my profile.</div>
      {profile
        ? Object.entries(profile).map(([key, value]) => (
            <div key={key}>{key}: {value}</div>
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