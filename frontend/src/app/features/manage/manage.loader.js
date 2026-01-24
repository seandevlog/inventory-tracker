import { getUser } from '@stores/user';

export const manage = ({ context }) => {
  return { user: context?.user ?? getUser() };
}