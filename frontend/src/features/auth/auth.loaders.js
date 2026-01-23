import { redirect } from "react-router-dom";
import { 
  // refresh as refreshClient,
  logout as logoutClient
} from "./auth.services";
import { setToken } from "@stores/token";

export const logout = async () => {
  const { success, error } = await logoutClient();

  if (success) {
    setToken('');
    return redirect('/');
  }
}