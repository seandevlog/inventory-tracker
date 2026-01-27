import { redirect } from "react-router-dom";
import { userSchema } from "@my-org/shared/validators";
import { 
  create as createUser,
  edit as editUser,
  destroy as deleteUser
} from "./services"

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

  return redirect('/users')
}

export const edit = async ({ request, params, context }) => {
  const { accessToken } = context;
  const { userId: id } = params;
  const formData = await request.formData();

  const intent = formData.get('intent');

  if (intent === 'update') return update({ accessToken, id, formData });
  if (intent === 'delete') return destroy({ accessToken, id});
  throw new Error('Intent should be either update or delete');
}

const update = async ({ accessToken, id, formData }) => {
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

const destroy = async ({ accessToken, id }) => {
  const data = await deleteUser({ id, accessToken })
  const { error } = data;

  if (error) return redirect('/');
  return redirect('/users');
}