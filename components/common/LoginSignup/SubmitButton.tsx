import type { Variant } from "../../../types";
import styles from "./SubmitButton.module.scss";
import cls from "classnames";

interface Props {
   variant: Variant;
   loading: boolean;
}

const SubmitButton = ({ variant, loading }: Props) => {
   const inputStyles = cls(styles.root, { [styles["root--loading"]]: loading });

   const Value = () => {
      if (loading) {
         return "loading...";
      } else {
         if (variant === "login") {
            return "sign in";
         } else if (variant === "signup") {
            return "Create Free Account";
         } else {
            return "Send password reset email";
         }
      }
   };

   return <input className={inputStyles} type="submit" value={Value()} disabled={loading} />;
};

export default SubmitButton;
