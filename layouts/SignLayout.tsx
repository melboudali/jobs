import withAuth from "@hoc/withAuth";
import { SignLayoutProps } from "@globalTypes";
import Footer from "@components/common/LoginSignup/Footer";
import styles from "./Layouts.module.scss";

const SignLayout = ({ children, question, suggestion, to }: SignLayoutProps) => (
   <>
      <main className={styles.signMain}>{children}</main>
      <Footer question={question} suggestion={suggestion} to={to} />
   </>
);

export default withAuth(true, SignLayout);
