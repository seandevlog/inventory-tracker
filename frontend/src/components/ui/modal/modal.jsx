const Modal = ({ isVisible, setVisibility, children, styles }) => {
  const handleWrapper = (event) => {
    if (event.currentTarget === event.target) return setVisibility(false);
  }

  return (
    <div 
      className={styles.wrapper}
      style={isVisible
        ? undefined
        : { display: 'none' }
      }
      onClick={handleWrapper}
    >
      <div 
        className={isVisible
          ? styles.modal
          : styles.hide
        }
      >
        {children}
      </div>
    </div>
  )
}

export default Modal;