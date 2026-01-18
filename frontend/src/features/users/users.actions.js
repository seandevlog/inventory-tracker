import { redirect } from "react-router-dom";
import { 
  create as createUser,
  edit as editUser,
  destroy as deleteUser
} from "./users.services"

export const create = async ({ request }) => {
  const formData = await request.formData();
  const data = await createUser(formData);
  const { error } = data;
  
  if (error) return redirect('/login');

  return redirect('/users');
}

export const view = () => {
  return redirect('./edit')
}

export const edit = async ({ request, params }) => {
  const formData = await request.formData();
  let intent = Object.fromEntries(formData.entries()).intent;
  if (intent === 'save') { 
    const data = await editUser({ formData, id: params.userId });
    const { error } = data;
  
    if (error) return redirect('/login');
    return redirect('..');
  } else if (intent === 'delete') {
    const data = await deleteUser({ id: params.userId })
    const { error } = data;
  
    if (error) return redirect('/login');
    return redirect('/users');
  }
  throw new Error(`Action not allowed. Using: ${params.button}`);
}