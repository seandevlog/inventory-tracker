let profile = {};

const getProfile = () => {
  return profile;
}

const setProfile = ({ profile: newData }) => {
  profile = newData;
}

export {
  getProfile,
  setProfile
}