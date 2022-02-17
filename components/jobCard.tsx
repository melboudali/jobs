import Image from "next/image";
import React from "react";
import styles from "./jobCard.module.scss";

interface Props {
	children: React.ReactNode;
}

const JobCard = ({ children }: Props) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.top}>
				<Image className={styles.top__img} src="https://dexibell.com/app/uploads/2018/05/facebook-logo.png" height={34} width={34} alt="logo" />
				<div className={styles.top__titleandcname}>
					<h3 title="facebook advertising specialist">facebook advertising specialist</h3>
					<p>facebook</p>
				</div>
			</div>
		</div>
	);
};

export default JobCard;
