import { redirect } from "react-router-dom";
import { create as createUser } from "./users.services"

export const create = async ({ request }) => {
  const formData = await request.formData();
  await createUser(formData);

  return redirect('/users');
}