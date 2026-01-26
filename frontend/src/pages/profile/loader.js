import { getUser } from '@stores/user';

export const profile = ({ context }) => {
  return { user: context?.user ?? getUser() };
}