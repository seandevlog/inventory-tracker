import { redirect } from "react-router-dom";
import { itemSchema } from "@my-org/shared/validators";
import { 
  create as createItem,
  update as updateItem,
  destroy as deleteItem
} from "../services"

const path = 'item';

export const create = async ({ request, context }) => {
  const { accessToken } = context; 
  const formData = await request.formData();

  const { error: validationError } = itemSchema.validate(Object.fromEntries(formData));
  if (validationError) {
    return { validationError }; 
  }

  const { data, error } = await createItem({ formData, accessToken, path });
  
  if (error) return { error };
  if (data) return redirect('/items')
}

export const edit = async ({ request, params, context }) => {
  const { accessToken } = context;
  const { itemId: id } = params;
  const formData = await request.formData();

  const intent = formData.get('intent');

  if (intent === 'update') return update({ accessToken, id, formData });
  if (intent === 'delete') return destroy({ accessToken, id});
  throw new Error('Intent should be either update or delete');
}

const update = async ({ accessToken, id, formData }) => {
  const keys = itemSchema._ids._byKey.keys().toArray();
  const optionalInputsSchema = itemSchema.fork(keys, (field) => field.optional());

  const { error: validationError } = optionalInputsSchema.validate(Object.fromEntries(formData));
  
  if (validationError) {
    return { validationError }; 
  }

  const { data, error } = await updateItem({ formData, id, accessToken, path });

  if (error) return { error };
  if (data) return redirect('..');
}

const destroy = async ({ accessToken, id }) => {
  const data = await deleteItem({ id, accessToken, path })
  const { error } = data;

  if (error) return redirect('/');
  return redirect('/items');
}