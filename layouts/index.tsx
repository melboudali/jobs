import Header from "../components/common/header";
import Footer from "../components/common/footer";
import styles from "./layouts.module.scss";

interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => (
	<>
		<Header />
		<main className={styles.main}>{children}</main>
		<Footer />
	</>
);

export default Layout;
