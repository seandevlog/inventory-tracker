import { redirect } from "react-router-dom";
import { 
  get as getUser,
  getAll as getAllUsers 
} from "./users.services";

export const getAll = async ({ context }) => {
  const { accessToken } = context;
  const data = await getAllUsers({ accessToken });
  const { users } = data;

  return users;
}

export const get = async ({ params, context }) => {
  const { accessToken } = context;
  const data = await getUser({ id: params.userId, accessToken });

  const { error, user } = data;
  
  if (error) return redirect('/');

  return user;
}