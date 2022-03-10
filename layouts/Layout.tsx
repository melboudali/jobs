import { FC } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import styles from "./Layouts.module.scss";

const Layout: FC = ({ children }) => (
	<>
		<Header />
		<main className={styles.main}>{children}</main>
		<Footer />
	</>
);

export default Layout;
