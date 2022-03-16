import Footer from "../components/common/LoginSignup/Footer";
import styles from "./Layouts.module.scss";

interface Props {
   question: string;
   suggestion: string;
   to: "/login" | "/signup";
}

const SignLayout: React.FC<Props> = ({ children, question, suggestion, to }) => (
   <>
      <main className={styles.signMain}>{children}</main>
      <Footer question={question} suggestion={suggestion} to={to} />
   </>
);

export default SignLayout;
