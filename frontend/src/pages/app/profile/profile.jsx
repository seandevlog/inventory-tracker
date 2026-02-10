import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import AppContext from '@contexts/app.context';

import config from '@config';
const { path } = config;

const Profile = () => {
  const navigate = useNavigate()

  const { profile } = useContext(AppContext);

  return (
    <main>
      <div>This is my profile.</div>
      {profile
        ? Object.entries(profile).map(([key, value]) => (
            <div key={key}>{key}: {value}</div>
          ))
        : 'No Data Found'
      }
      <button
        onClick={() => navigate(path.manage.absolute)}
      >
        Go Home
      </button>
    </main>
  );
};

export default Profile;