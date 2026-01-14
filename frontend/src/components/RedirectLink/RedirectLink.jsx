import styles from './Redirect.module.css';

const RedirectLink = ({ url, children, className }) => {
  return (
    <a href={url} className={styles[`${className}`]}>{children}</a>
  )
}

export default RedirectLink;