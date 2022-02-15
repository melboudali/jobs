import React from "react";
import styles from "./title.module.scss";

interface Props {
	children: React.ReactNode;
}

const Title = ({ children }: Props) => {
	return <h2 className={styles.title}>{children}</h2>;
};

export default Title;
