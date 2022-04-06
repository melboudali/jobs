import { memo, type ReactNode } from "react";
import styles from "../../../pages/index.module.scss";

interface Props {
   children: ReactNode;
}

const Title = ({ children }: Props) => <h2 className={styles.title}>{children}</h2>;

export default memo<Props>(Title);
