import services from "./services"
import { getToken } from '@stores/token';
import removeLastS from "@utils/removeLastS";

export const create = async ({ request, path, schema }) => {
  const accessToken = getToken(); 
  const formData = await request.formData();

  const { value, error: validationError } = schema.validate(Object.fromEntries(formData));
  if (validationError) {
    console.log(validationError)
    return { success: false, validationError, error: null, data: value }; 
  }

  const { data, error } = await services.create({ formData, accessToken, path });
  
  if (error) return { success: false, error: error ?? null, data: null };
  if (data) return { success: true, error: null, data };
}

export const edit = async ({ request, params, path, schema }) => {
  const accessToken = getToken();
  const id = params[`${removeLastS(path)}Id`]
  const formData = await request.formData();

  const intent = formData.get('intent');

  if (intent === 'update') return update({ accessToken, id, formData, path, schema });
  if (intent === 'delete') return destroy({ accessToken, id, path, schema});
  throw new Error('Intent should be either update or delete');
}

const update = async ({ accessToken, id, formData, path, schema }) => {
  const keys = schema._ids._byKey.keys().toArray();
  const optionalInputsSchema = schema.fork(keys, (field) => field.optional().allow(null, ''));

  const { value, error: validationError } = optionalInputsSchema.validate(Object.fromEntries(formData));
  
  if (validationError) {
    console.log(validationError)
    return { success: false, validationError, error: null, data: value };
  }

  const { data, error } = await services.update({ formData, id, accessToken, path });

  if (error) return { success: false, error: error ?? null, data: null };
  if (data) return { success: true, error: null, data };
}

const destroy = async ({ accessToken, id, path }) => {
  const data = await services.destroy({ id, accessToken, path })
  const { error } = data;

  if (error) return { success: false, error: error ?? null, data: null };
  if (data) return { success: true, error: null, data };
}