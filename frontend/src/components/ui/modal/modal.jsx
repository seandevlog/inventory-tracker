import { useEffect } from "react";

const Modal = ({
  isVisible,
  onClose,
  children,
  styles,
}) => {
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div
      className={styles.wrapper}
      onClick={handleBackdropClick}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label="Data entry modal"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;