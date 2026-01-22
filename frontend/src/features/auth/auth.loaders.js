import { redirect } from "react-router-dom";
import { 
  refresh as refreshClient,
  logout as logoutClient
} from "./auth.services";
import { setToken } from "@stores/token";

// Refresh required to check if client is already logged in
export const auth = async () => {
  try {
    const data = await refreshClient();
    const { accessToken } = data;

    if (accessToken) {
      setToken(accessToken);
      return redirect('/users');
    }
  } catch (err) {
    ;
  }
}

export const logout = async () => {
  const { success, error } = await logoutClient();

  if (success) {
    setToken('');
    return redirect('/');
  }
}