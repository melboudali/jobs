import Header from "../components/header";
import styles from "./layout.module.scss";

interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => (
	<>
		<Header />
		<main className={styles.main}>{children}</main>
		<footer />
	</>
);

export default Layout;
