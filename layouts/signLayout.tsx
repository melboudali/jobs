import styles from "./layouts.module.scss";

interface Props {
	children: React.ReactNode;
}

const SignLayout = ({ children }: Props) => (
	<>
		<main className={styles.signMain}>{children}</main>
		<footer></footer>
	</>
);

export default SignLayout;
