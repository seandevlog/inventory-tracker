import { redirect } from "react-router-dom";
import { 
  logout as logoutClient
} from "./auth.services";
import { setToken } from "@stores/token";

export const logout = async () => {
  const { success } = await logoutClient();

  if (success) {
    setToken('');
    return redirect('/');
  }
}