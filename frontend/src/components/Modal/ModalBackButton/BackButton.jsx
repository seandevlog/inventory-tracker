import styles from './BackButton.module.css'

const BackButton = ({className}) => (
  <button className={styles[className]}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" className={`${styles.backArrow} icon icon-tabler icons-tabler-outline icon-tabler-arrow-back`}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" />
    </svg>
  </button>
)

export default BackButton;