import { useContext, useEffect } from "react";
import {
  Outlet,
  useNavigate,
} from "react-router-dom";

import styles from "./auth.module.css";

import AppContext from "@contexts/app.context";

import config from "@config";

const { path } = config;

const Auth = () => {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate(path.root, {
        replace: true,
      });
    }
  }, [token, navigate]);

  if (token) return null;

  return (
    <div className={styles.wrapper}>
      <main className={styles.authPanel}>
        <div className={styles.authScroll}>
          <div className={styles.authContent}>
            <Outlet
              context={{
                classes: styles,
              }}
            />
          </div>
        </div>
      </main>

      <div
        className={styles.backgroundImage}
        aria-hidden="true"
      >
        <img src="/storage.jpg" alt="" />
      </div>
    </div>
  );
};

export default Auth;