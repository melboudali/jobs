import styles from "./Loading.module.scss";
import Logo from "./Navbar/Logo";

const LoadingSpinner = () => (
   <div className={styles.spinner}>
      <Logo large />
   </div>
);

export default LoadingSpinner;
