import { getProfile as get } from './services';
import { getProfile } from '@stores/profile';

export const profile = async () => {
  const profile = await get();

  return { profile: profile || getProfile() };
}