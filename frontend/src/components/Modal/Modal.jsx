import {
  useState,
  useEffect
} from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useLocation } from 'react-router-dom';

import styles from './modal.module.css';

import BackButton from '@components/buttons/back/back';
import modes from './modes';
import { 
  FormCreate, 
  FormEdit, 
  FormView 
} from '@components/forms';

const Modal = ({ mode, title }) => {
  const navigate = useNavigate();
  const { pathname }= useLocation();
  const firstPath = pathname.match(/^\/([^\/]+)\//);

  const [show, setShow] = useState(true)

  const handleCloseWithBackground = (event) => {
    if (event.currentTarget === event.target)
      setShow(false);
  }

  const handleCloseButton = () => {
    setShow(false);
  }

  useEffect(() => {
    if (!show)
      navigate(firstPath); 
  }, [show, navigate, firstPath])

  return show && createPortal(
      <div onClick={handleCloseWithBackground}>
        <div className={styles.modal}>
          <BackButton 
            className="modalClose"
            onClose={handleCloseButton}
          />
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
      </div>,
    document.body
  )
}

export default Modal;