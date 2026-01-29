import { redirect } from "react-router-dom";
import { 
  get as getUser,
  getAll as getAllUsers
} from "../services";

const path = 'user';

export const getAll = async ({ context }) => {
  const { accessToken } = context;
  const data = await getAllUsers({ accessToken, path });
  const { users } = data;

  return users;
}

export const get = async ({ params, context }) => {
  const { accessToken } = context;
  const data = await getUser({ id: params.userId, accessToken, path });

  const { error, user } = data;
  
  if (error) return redirect('/');

  return user;
}