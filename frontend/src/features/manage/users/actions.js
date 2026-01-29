import { redirect } from "react-router-dom";
import { userSchema } from "@my-org/shared/validators";
import { 
  create as createUser,
  update as updateUser,
  destroy as deleteUser
} from "../services"

const path = 'user';

export const create = async ({ request, context }) => {
  const { accessToken } = context; 
  const formData = await request.formData();

  const { error: validationError } = userSchema.validate(Object.fromEntries(formData));
  if (validationError) {
    return { validationError }; 
  }

  const { data, error } = await createUser({ formData, accessToken, path });
  
  if (error) return { error };
  if (data) return redirect('/users')
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

  const { data, error } = await updateUser({ formData, id, accessToken, path });

  if (error) return { error };
  if (data) return redirect('..');
}

const destroy = async ({ accessToken, id }) => {
  const data = await deleteUser({ id, accessToken, path })
  const { error } = data;

  if (error) return redirect('/');
  return redirect('/users');
}