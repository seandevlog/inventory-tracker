import { redirect } from "react-router-dom";
import { 
  get as getSupplier,
  getAll as getAllSuppliers
} from "./services";

export const getAll = async ({ context }) => {
  const { accessToken } = context;
  const data = await getAllSuppliers({ accessToken });
  const { suppliers } = data;

  return suppliers;
}

export const get = async ({ params, context }) => {
  const { accessToken } = context;
  const data = await getSupplier({ id: params.supplierId, accessToken });

  const { error, supplier } = data;
  
  if (error) return redirect('/');

  return supplier;
}