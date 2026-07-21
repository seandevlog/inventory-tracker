import styles from "./logo.module.css";

const Logo = ({
  classes = "",
  alt = "DataTable",
}) => {
  return (
    <span
      id="logo"
      className={`${styles.logo} ${classes}`}
    >
      <span className={styles.logoCrop}>
        <img
          src="/logo_big.png"
          alt={alt}
        />
      </span>
    </span>
  );
};

export default Logo;