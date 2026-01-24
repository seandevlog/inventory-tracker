import { redirect } from "react-router-dom";
import { 
  get as getItem,
  getAll as getAllItems 
} from "./items.services";

export const getAll = async ({ context }) => {
  const { accessToken } = context;
  const data = await getAllItems({ accessToken });
  const { items } = data;

  return items;
}

export const get = async ({ params, context }) => {
  const { accessToken } = context;
  const data = await getItem({ id: params.itemId, accessToken });

  const { error, item } = data;
  
  if (error) return redirect('/');

  return item;
}