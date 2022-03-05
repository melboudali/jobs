import Header from "../components/common/header";
import Footer from "../components/common/footer";
import styles from "./applayout.module.scss";

interface Props {
	children: React.ReactNode;
}

const AppLayout = ({ children }: Props) => <main className={styles.main}>{children}</main>;

export default AppLayout;
