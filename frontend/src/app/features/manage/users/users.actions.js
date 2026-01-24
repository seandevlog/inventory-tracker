import { redirect } from "react-router-dom";
import { userSchema } from "@my-org/shared/validators";
import { 
  create as createUser,
  edit as editUser,
  destroy as deleteUser
} from "./users.services"

export const create = async ({ request, context }) => {
  const { accessToken } = context;
  const formData = await request.formData();

  const { error: validationError } = userSchema.validate(Object.fromEntries(formData));
  if (validationError) {
    return { validationError }; 
  }

  const data = await createUser({ formData, accessToken });
  const { error } = data;
  
  if (error) return redirect('/');

  return redirect('/users');
}

export const view = () => {
  return redirect('./edit')
}

export const edit = async ({ request, params, context }) => {
  const { accessToken } = context;
  const { userId: id } = params; 
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
  const keys = userSchema._ids._byKey.keys().toArray();
  const optionalInputsSchema = userSchema.fork(keys, (field) => field.optional());

  const { error: validationError } = optionalInputsSchema.validate(Object.fromEntries(formData));
  
  if (validationError) {
    return { validationError }; 
  }
  
  const data = await editUser({ formData, id, accessToken });
  const { error } = data;

  if (error) return redirect('/');
  return redirect('..');
}

export const destroy = async ({ id, accessToken }) => {
  const data = await deleteUser({ id, accessToken })
  const { error } = data;

  if (error) return redirect('/');
  return redirect('/users');
}