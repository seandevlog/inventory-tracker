import {
  useEffect,
  useState,
} from "react";

import styles from "./sidebar.module.css";

import Filter from "@components/ui/filter/filter";
import useMediaQuery from "@hooks/useMediaQuery";

const Sidebar = () => {
  const isMobile = useMediaQuery("(max-width: 767px)");

  const [isOpen, setIsOpen] = useState(!isMobile);

  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);

  return (
    <>
      {isMobile && isOpen && (
        <button
          type="button"
          className={styles.backdrop}
          aria-label="Close filters"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`${styles.sidebar} ${
          isOpen ? styles.open : styles.closed
        }`}
        aria-label="Table filters"
      >
        <button
          type="button"
          className={styles.toggle}
          aria-label={
            isOpen
              ? "Close filter sidebar"
              : "Open filter sidebar"
          }
          aria-expanded={isOpen}
          onClick={() =>
            setIsOpen((current) => !current)
          }
        >
          <span aria-hidden="true">
            {isOpen ? "‹" : "›"}
          </span>
        </button>

        <div
          className={styles.sidebarContent}
          aria-hidden={!isOpen}
        >
          <Filter />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;