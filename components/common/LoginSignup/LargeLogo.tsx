import Logo from "../Navbar/Logo";
import styles from "./LargeLogo.module.scss";

interface Props {
   variant: "login" | "signup" | "password-rest";
}

const variants = {
   login: "Sign in to jobs",
   signup: "Sign up to jobs",
   "password-rest": "Reset your password",
};

const LargeLogo = ({ variant }: Props) => (
   <div className={styles.logo}>
      <Logo large />
      <p className={styles.logo__name}>{variants[variant]}</p>
   </div>
);

LargeLogo.defaultProps = {
   variant: "login",
};

export default LargeLogo;
