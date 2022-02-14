import Image from "next/image";
import logo from "../../public/logo-200.png";
import styles from "./index.module.scss";

const Logo = () => (
	<div className={styles.logo}>
		<Image src={logo} alt="logo" width={34} height={34} />
		<span>jobs</span>
	</div>
);

export default Logo;
