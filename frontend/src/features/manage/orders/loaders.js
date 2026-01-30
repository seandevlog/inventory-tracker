import { redirect } from "react-router-dom";
import { 
  get as getOrder,
  getAll as getAllOrders
} from "../services";

const path = 'order';

export const getAll = async ({ context }) => {
  const { accessToken } = context;
  const data = await getAllOrders({ accessToken, path });
  const { orders } = data;

  return orders;
}

export const get = async ({ params, context }) => {
  const { accessToken } = context;
  const data = await getOrder({ id: params.orderId, accessToken, path });

  const { error, order } = data;
  
  if (error) return redirect('/');

  return order;
}