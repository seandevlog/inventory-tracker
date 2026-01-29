import { redirect } from "react-router-dom";
import { locationSchema } from "@my-org/shared/validators";
import { 
  create as createLocation,
  update as updateLocation,
  destroy as deleteLocation
} from "../services"

const path = 'location';

export const create = async ({ request, context }) => {
  const { accessToken } = context; 
  const formData = await request.formData();

  const { error: validationError } = locationSchema.validate(Object.fromEntries(formData));
  if (validationError) {
    return { validationError }; 
  }

  const { data, error } = await createLocation({ formData, accessToken, path });
  
  if (error) return { error };
  if (data) return redirect('/locations')
}

export const edit = async ({ request, params, context }) => {
  const { accessToken } = context;
  const { locationId: id } = params;
  const formData = await request.formData();

  const intent = formData.get('intent');

  if (intent === 'update') return update({ accessToken, id, formData });
  if (intent === 'delete') return destroy({ accessToken, id});
  throw new Error('Intent should be either update or delete');
}

const update = async ({ accessToken, id, formData }) => {
  const keys = locationSchema._ids._byKey.keys().toArray();
  const optionalInputsSchema = locationSchema.fork(keys, (field) => field.optional());

  const { error: validationError } = optionalInputsSchema.validate(Object.fromEntries(formData));
  
  if (validationError) {
    return { validationError }; 
  }

  const { data, error } = await updateLocation({ formData, id, accessToken, path });

  if (error) return { error };
  if (data) return redirect('..');
}

const destroy = async ({ accessToken, id }) => {
  const data = await deleteLocation({ id, accessToken, path })
  const { error } = data;

  if (error) return redirect('/');
  return redirect('/locations');
}