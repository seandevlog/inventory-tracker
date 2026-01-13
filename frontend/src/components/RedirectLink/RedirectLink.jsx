import styles from './Redirect.module.css';

const RedirectLink = ({ url, children, className }) => {
  return (
    <span className={styles[`${className}`]} data-url={url}>{children}</span>
  )
}

export default RedirectLink;