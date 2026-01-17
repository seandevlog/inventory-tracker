import * as React from "react";

const AuthContext = React.createContext();

export const AuthProvider = ({ accessToken }) => (
  <AuthContext value={{accessToken}}></AuthContext>
)

export const useAuth = () => React.useContext(AuthContext);