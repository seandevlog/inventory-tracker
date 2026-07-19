import { useState } from "react";

import Modal from "@components/ui/modal/modal";

const useModal = ({
  styles,
  isVisible,
  onClose,
}) => {
  const [content, setContent] = useState(null);

  const modal = (
    <Modal
      isVisible={isVisible}
      onClose={onClose}
      styles={styles}
    >
      {content}
    </Modal>
  );

  return {
    setContent,
    modal,
  };
};

export default useModal;