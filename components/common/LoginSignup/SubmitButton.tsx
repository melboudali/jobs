import { memo } from "react";
import cls from "classnames";
import type { Variant } from "@globalTypes";
import styles from "./SubmitButton.module.scss";

interface Props {
   variant: Variant;
   loading: boolean;
}

const SubmitButton = ({ variant, loading }: Props) => {
   const inputStyles = cls(styles.root, { [styles["root--loading"]]: loading });

   const Values = {
      login: "sign in",
      signup: "Create Free Account",
      "password-rest": "Send password reset email",
   };

   return (
      <button className={inputStyles} type="submit" disabled={loading}>
         <span>{Values[variant]}</span>
      </button>
   );
};

export default memo(SubmitButton);
