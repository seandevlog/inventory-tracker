import {
  useState,
  useEffect,
  useContext
} from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './modal.module.css';

import modes from './modes';
import { 
  FormCreate, 
  FormEdit, 
  FormView 
} from './forms';

import MainContext from '@contexts/main.context';

import firstCharUppercase from '@utils/firstCharUppercase';

import Svg from '@assets/backButton.svg'

import config from '@config';
const { path } = config;

const Modal = ({ mode, title }) => {
  const navigate = useNavigate();
  const { id } = useContext(MainContext);

  const [show, setShow] = useState(true)

  const handleCloseWithBackground = (event) => {
    if (event.currentTarget === event.target)
      setShow(false);
  }

  const handleCloseButton = () => {
    setShow(false);
  }

  useEffect(() => {
    if (!show) {
      document.title = firstCharUppercase(id);
      navigate(path[`${id}s`].absolute); 
    }
  }, [id, navigate, show])

  useEffect(() => {
    document.title = firstCharUppercase(title);
  }, [title]);

  return (
    <div onClick={handleCloseWithBackground}>
      <div className={styles.modal}>
        <BackButton 
          className={"modalClose"}
          onClick={handleCloseButton}
        />
        <div>
          <header>{title}</header>
              
          {mode === modes.CREATE
            ? <FormCreate/>
            : mode === modes.VIEW
            ? <FormView/>
            : mode === modes.EDIT
            ? <FormEdit/>
            : null
          }
        </div>
      </div>
    </div>
  )
}

const BackButton = ({ onClick }) => (
  <button 
    className={styles.back}
    onClick={onClick}  
  >
    <Svg/>
  </button>
)

export default Modal;
