import { memo } from "react";
import cls from "classnames";
import styles from "./Button.module.scss";

interface Props {
   text: string;
   loading: boolean;
   onClick: () => Promise<void>;
}

const Button = ({ text, loading, onClick }: Props) => {
   const inputStyles = cls(styles.root, { [styles["root--loading"]]: loading });

   return (
      <button className={inputStyles} type="button" disabled={loading} onClick={onClick}>
         <span>{text}</span>
      </button>
   );
};

export default memo(Button);
