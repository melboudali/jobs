import React from "react";
import styles from "./jobCard.module.scss";

interface Props {
	children: React.ReactNode;
}

const JobCard = ({ children }: Props) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.top}>{children}</div>
		</div>
	);
};

export default JobCard;
