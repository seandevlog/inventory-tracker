import { redirect } from "react-router-dom";
import { itemSchema } from "@my-org/shared/validators";
import { 
  create as createItem,
  edit as editItem,
  destroy as deleteItem
} from "./items.services"

export const create = async ({ request, context }) => {
  const { accessToken } = context;
  const formData = await request.formData();

  const { error: validationError } = itemSchema.validate(Object.fromEntries(formData));
  if (validationError) {
    return { validationError }; 
  }

  const data = await createItem({ formData, accessToken });
  const { error } = data;
  
  if (error) return redirect('/');

  return redirect('/items');
}

export const view = () => {
  return redirect('./edit')
}

export const edit = async ({ request, params, context }) => {
  const { accessToken } = context;
  const { itemId: id } = params; 
  const formData = await request.formData();
  
  const intent = Object.fromEntries(formData.entries()).intent;

  if (intent === 'save') { 
    return await update({ id, accessToken, formData });
  } else if (intent === 'delete') {
    return await destroy({ id, accessToken });
  }
  throw new Error(`Action not allowed. Using: ${params.button}`);
}

export const update = async ({ id, accessToken, formData }) => {
  const keys = itemSchema._ids._byKey.keys().toArray();
  const optionalInputsSchema = itemSchema.fork(keys, (field) => field.optional());

  const { error: validationError } = optionalInputsSchema.validate(Object.fromEntries(formData));
  
  if (validationError) {
    return { validationError }; 
  }
  
  const data = await editItem({ formData, id, accessToken });
  const { error } = data;

  if (error) return redirect('/');
  return redirect('..');
}

export const destroy = async ({ id, accessToken }) => {
  const data = await deleteItem({ id, accessToken })
  const { error } = data;

  if (error) return redirect('/');
  return redirect('/items');
}