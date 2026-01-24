let user = {};

const getUser = () => {
  return user;
}

const setUser = ({ user: newData }) => {
  user = newData;
}

export {
  getUser,
  setUser
}