import {
  useState,
  useEffect
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './modal.module.css';

import BackButton from '@components/buttons/back/back';
import modes from './modes';
import { 
  FormCreate, 
  FormEdit, 
  FormView 
} from './forms';

import getTopLevelRoute from '@utils/getTopLevelRoute';
import firstCharUppercase from '@utils/firstCharUppercase';

const Modal = ({ mode, title }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const topRoute = getTopLevelRoute(pathname);

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
      document.title = firstCharUppercase(topRoute);
      navigate(`/${topRoute}`, { relative: 'route' }); 
    }
  }, [show, navigate, topRoute])

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

export default Modal;
