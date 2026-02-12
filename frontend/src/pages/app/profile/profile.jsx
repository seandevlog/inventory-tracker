import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import styles from './profile.module.css';

import Building from "@layouts/building/building";

import AppContext from '@contexts/app.context';

import config from '@config';
const { path } = config;

const Profile = () => {
  const navigate = useNavigate()

  const { profile } = useContext(AppContext);

  return (
    <Building/>
  );
};

export default Profile;