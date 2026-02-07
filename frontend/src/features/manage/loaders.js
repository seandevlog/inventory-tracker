import { redirect } from "react-router-dom";
import services from "./services";
import { removeLastS } from '@utils/removeLastS';
import { getToken } from '@stores/token';
import firstCharUppercase from '@utils/firstCharUppercase';

import config from '@config';
const { login } = config.path;

export const getAll = async ({ path }) => {
  document.title = firstCharUppercase(path);
  const accessToken = getToken();
  const data = await services.getAll({ accessToken, path });
  return data[`${path}`];
}

export const get = async ({ params, path }) => {
  document.title = firstCharUppercase(path);
  const accessToken = getToken();
  const data = await services.get({ id: params[`${removeLastS(path)}`], accessToken, path });

  const { error } = data;
  if (error) return redirect(login);

  return data[`${path}`];
}