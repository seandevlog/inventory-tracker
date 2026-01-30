import { redirect } from "react-router-dom";
import { orderSchema } from "@my-org/shared/validators";
import { 
  create as createOrder,
  update as updateOrder,
  destroy as deleteOrder
} from "../services"

const path = 'order';

export const create = async ({ request, context }) => {
  const { accessToken } = context; 
  const formData = await request.formData();

  const { error: validationError } = orderSchema.validate(Object.fromEntries(formData));
  if (validationError) {
    return { validationError }; 
  }

  const { data, error } = await createOrder({ formData, accessToken, path });
  
  if (error) return { error };
  if (data) return redirect('/orders')
}

export const edit = async ({ request, params, context }) => {
  const { accessToken } = context;
  const { orderId: id } = params;
  const formData = await request.formData();

  const intent = formData.get('intent');

  if (intent === 'update') return update({ accessToken, id, formData });
  if (intent === 'delete') return destroy({ accessToken, id});
  throw new Error('Intent should be either update or delete');
}

const update = async ({ accessToken, id, formData }) => {
  const keys = orderSchema._ids._byKey.keys().toArray();
  const optionalInputsSchema = orderSchema.fork(keys, (field) => field.optional());

  const { error: validationError } = optionalInputsSchema.validate(Object.fromEntries(formData));
  
  if (validationError) {
    return { validationError }; 
  }

  const { data, error } = await updateOrder({ formData, id, accessToken, path });

  if (error) return { error };
  if (data) return redirect('..');
}

const destroy = async ({ accessToken, id }) => {
  const data = await deleteOrder({ id, accessToken, path })
  const { error } = data;

  if (error) return redirect('/');
  return redirect('/orders');
}