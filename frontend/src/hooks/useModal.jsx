import { useState, useMemo } from "react"

import Modal from "@components/modal/modal";

const useModal = (styles) => {
  const [isVisible, setVisibility] = useState(false);
  const [content, setContent] = useState(null);
  
  const Component = useMemo(() => {
    return () => {
      return (
        <Modal
          setVisibility={setVisibility}
          isVisible={isVisible}
          styles={styles}
        >
          {content}
        </Modal>
      )
    }
  }, [isVisible, content, styles])

  return { setContent, setVisibility, Component }
}

export default useModal;