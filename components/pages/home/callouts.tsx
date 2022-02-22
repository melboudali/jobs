import Image from "next/image";
import { FC } from "react";
import styles from "./callouts.module.scss";
import data from "../../../data/callouts.json";

interface Props {}

const Callouts = ({}: Props) => {
	return (
		<div className={styles.root}>
			<Callout direction="left" />
			<Callout direction="left" />
		</div>
	);
};

const Callout: FC<{ direction: "right" | "left" }> = ({ direction }) => {
	return (
		<div>
			<Image src={data[0].image} alt="hero image" width={399} height={399} objectFit="cover" quality={100}></Image>
		</div>
	);
};

export default Callouts;
