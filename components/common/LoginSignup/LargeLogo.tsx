import Logo from "../Navbar/Logo";
import styles from "./LargeLogo.module.scss";

interface Props {
   variant: "login" | "signup" | "password-rest";
}

const LargeLogo = ({ variant }: Props) => (
   <div className={styles.logo}>
      <Logo large />
      <p className={styles.logo__name}>
         {variant === "login" ? "Sign in to jobs" : variant === "signup" ? "Sign up to jobs" : "Reset your password"}
      </p>
   </div>
);

LargeLogo.defaultProps = {
   isSignUp: false,
};

export default LargeLogo;
