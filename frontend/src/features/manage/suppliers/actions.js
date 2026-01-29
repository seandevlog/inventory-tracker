import { redirect } from "react-router-dom";
import { supplierSchema } from "@my-org/shared/validators";
import { 
  create as createSupplier,
  update as updateSupplier,
  destroy as deleteSupplier
} from "../services"

const path = 'supplier';

export const create = async ({ request, context }) => {
  const { accessToken } = context; 
  const formData = await request.formData();

  const { error: validationError } = supplierSchema.validate(Object.fromEntries(formData));
  if (validationError) {
    return { validationError }; 
  }

  const { data, error } = await createSupplier({ formData, accessToken, path });
  
  if (error) return { error };
  if (data) return redirect('/suppliers')
}

export const edit = async ({ request, params, context }) => {
  const { accessToken } = context;
  const { supplierId: id } = params;
  const formData = await request.formData();

  const intent = formData.get('intent');

  if (intent === 'update') return update({ accessToken, id, formData });
  if (intent === 'delete') return destroy({ accessToken, id});
  throw new Error('Intent should be either update or delete');
}

const update = async ({ accessToken, id, formData }) => {
  const keys = supplierSchema._ids._byKey.keys().toArray();
  const optionalInputsSchema = supplierSchema.fork(keys, (field) => field.optional());

  const { error: validationError } = optionalInputsSchema.validate(Object.fromEntries(formData));
  
  if (validationError) {
    return { validationError }; 
  }

  const { data, error } = await updateSupplier({ formData, id, accessToken, path });

  if (error) return { error };
  if (data) return redirect('..');
}

const destroy = async ({ accessToken, id }) => {
  const data = await deleteSupplier({ id, accessToken, path })
  const { error } = data;

  if (error) return redirect('/');
  return redirect('/suppliers');
}