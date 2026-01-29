import { redirect } from "react-router-dom";
import { 
  get as getItem,
  getAll as getAllItems
} from "../services";

const path = 'item';

export const getAll = async ({ context }) => {
  const { accessToken } = context;
  const data = await getAllItems({ accessToken, path });
  const { items } = data;

  return items;
}

export const get = async ({ params, context }) => {
  const { accessToken } = context;
  const data = await getItem({ id: params.itemId, accessToken, path });

  const { error, item } = data;
  
  if (error) return redirect('/');

  return item;
}