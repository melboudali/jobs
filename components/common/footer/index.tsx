import Subscribe from "./subscribe";
import styles from "./footer.module.scss";

interface Props {}

const Footer = ({}: Props) => {
	return (
		<>
			<Subscribe />
			<footer className={styles.footer}></footer>
		</>
	);
};

export default Footer;
