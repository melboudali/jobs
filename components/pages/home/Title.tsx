import type { FC } from "react";
import styles from "../../../pages/index.module.scss";

const Title: FC = ({ children }) => <h2 className={styles.title}>{children}</h2>;

export default Title;
