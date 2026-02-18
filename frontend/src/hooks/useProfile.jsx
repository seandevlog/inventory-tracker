import { useState, useEffect } from "react";

import axios from "axios";

import config from "@config";
const { server } = config;

const useProfile = ({ refreshKey, token }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (token) (async () => {
      const { data } = await axios.get(`${server}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      
      const { profile: _profile } = data;
      setProfile(_profile);
    })()
  }, [token, refreshKey]);

  return { profile };
}

export default useProfile;