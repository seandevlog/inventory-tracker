import { getProfile as get } from './services';
import { getProfile } from '@stores/profile';
import { getToken } from '@stores/token';

export const profile = async ({ context }) => {
  const accessToken = getToken() || context.accessToken;

  const profile = await get({ accessToken });

  return { profile: profile || getProfile() };
}