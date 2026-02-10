import { redirect } from "react-router-dom";
import { 
  logout as logoutClient
} from "./services";
import { setToken } from "@stores/token";
import config from "@config";

const { path } = config;

export const logout = async () => {
  const { success } = await logoutClient();

  if (success) {
    setToken('');
    return redirect(path.root);
  }
}