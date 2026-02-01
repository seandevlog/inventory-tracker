import { redirect } from "react-router-dom";
import services from "./services"
import { removeLastS } from "@utils/removeLastS";

export const create = async ({ request, context, path, schema }) => {
  const { accessToken } = context; 
  const formData = await request.formData();

  const { error: validationError } = schema.validate(Object.fromEntries(formData));
  if (validationError) {
    return { validationError }; 
  }

  const { data, error } = await services.create({ formData, accessToken, path });
  
  if (error) return { error };
  if (data) return redirect(`/${path}`)
}

export const edit = async ({ request, params, context, path, schema }) => {
  const { accessToken } = context;
  const id = params[`${removeLastS(path)}Id`]
  const formData = await request.formData();

  const intent = formData.get('intent');

  if (intent === 'update') return update({ accessToken, id, formData, path, schema });
  if (intent === 'delete') return destroy({ accessToken, id, path, schema});
  throw new Error('Intent should be either update or delete');
}

const update = async ({ accessToken, id, formData, path, schema }) => {
  const keys = schema._ids._byKey.keys().toArray();
  const optionalInputsSchema = schema.fork(keys, (field) => field.optional());

  const { error: validationError } = optionalInputsSchema.validate(Object.fromEntries(formData));
  
  if (validationError) {
    return { validationError }; 
  }

  const { data, error } = await services.update({ formData, id, accessToken, path });

  if (error) return { error };
  if (data) return redirect('..');
}

const destroy = async ({ accessToken, id, path }) => {
  const data = await services.destroy({ id, accessToken, path })
  const { error } = data;

  if (error) return redirect('/');
  return redirect(`/${path}`);
}