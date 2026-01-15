import { 
  get as getUser,
  getAll as getAllUsers 
} from "./users.services";

export const getAll = async () => {
  const users = await getAllUsers();

  return users;
}

export const get = async ({ params }) => {
  const user = await getUser({ id: params.userId });

  return user;
}