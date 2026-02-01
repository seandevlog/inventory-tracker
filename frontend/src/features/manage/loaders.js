import { redirect } from "react-router-dom";
import services from "./services";
import config from '@config';
const { login } = config.path;

export const getAll = async ({ context, path }) => {
  const { accessToken } = context;
  const data = await services.getAll({ accessToken, path });
  return data[`${path}`];
}

export const get = async ({ params, context, path }) => {
  const { accessToken } = context;
  const data = await services.get({ id: params.itemId, accessToken, path });

  const { error } = data;
  if (error) return redirect(login);

  return data[`${path}`];
}