import { redirect } from "react-router-dom";
import { 
  get as getSupplier,
  getAll as getAllSuppliers
} from "../services";

const path = 'supplier';

export const getAll = async ({ context }) => {
  const { accessToken } = context;
  const data = await getAllSuppliers({ accessToken, path });
  const { suppliers } = data;

  return suppliers;
}

export const get = async ({ params, context }) => {
  const { accessToken } = context;
  const data = await getSupplier({ id: params.supplierId, accessToken, path });

  const { error, supplier } = data;
  
  if (error) return redirect('/');

  return supplier;
}