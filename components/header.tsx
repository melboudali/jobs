import Navar from "./navbar";
import styles from "./header.module.scss";

interface Props {}

const Header = ({}: Props) => {
	return (
		<header className={styles.header}>
			<Navar></Navar>
		</header>
	);
};

export default Header;
