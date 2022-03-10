import Logo from "../Navbar/Logo";
import styles from "./LargeLogo.module.scss";

const LargeLogo = () => (
	<div className={styles.logo}>
		<Logo large />
		<p className={styles.logo__name}>Sign in to jobs</p>
	</div>
);

export default LargeLogo;
