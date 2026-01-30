import { redirect } from "react-router-dom";
import { transactionSchema } from "@my-org/shared/validators";
import { 
  create as createTransaction,
  update as updateTransaction,
  destroy as deleteTransaction
} from "../services"

const path = 'transaction';

export const create = async ({ request, context }) => {
  const { accessToken } = context; 
  const formData = await request.formData();

  const { error: validationError } = transactionSchema.validate(Object.fromEntries(formData));
  if (validationError) {
    return { validationError }; 
  }

  const { data, error } = await createTransaction({ formData, accessToken, path });
  
  if (error) return { error };
  if (data) return redirect('/transactions')
}

export const edit = async ({ request, params, context }) => {
  const { accessToken } = context;
  const { transactionId: id } = params;
  const formData = await request.formData();

  const intent = formData.get('intent');

  if (intent === 'update') return update({ accessToken, id, formData });
  if (intent === 'delete') return destroy({ accessToken, id});
  throw new Error('Intent should be either update or delete');
}

const update = async ({ accessToken, id, formData }) => {
  const keys = transactionSchema._ids._byKey.keys().toArray();
  const optionalInputsSchema = transactionSchema.fork(keys, (field) => field.optional());

  console.log(Object.fromEntries(formData.entries()))
  const { error: validationError } = optionalInputsSchema.validate(Object.fromEntries(formData));
  
  if (validationError) {
    return { validationError }; 
  }

  const { data, error } = await updateTransaction({ formData, id, accessToken, path });

  if (error) return { error };
  if (data) return redirect('..');
}

const destroy = async ({ accessToken, id }) => {
  const data = await deleteTransaction({ id, accessToken, path })
  const { error } = data;

  if (error) return redirect('/');
  return redirect('/transactions');
}