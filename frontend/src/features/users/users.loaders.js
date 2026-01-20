import { redirect } from "react-router-dom";
import { 
  get as getUser,
  getAll as getAllUsers 
} from "./users.services";

export const getAll = async () => {
  const data = await getAllUsers();

  const { error, users } = data;
  
  if (error) return redirect('/');

  return users;
}

export const get = async ({ params }) => {
  const data = await getUser({ id: params.userId });

  const { error, user } = data;
  
  if (error) return redirect('/');

  return user;
}