import Image from "next/image";
import { FC } from "react";
import styles from "./callouts.module.scss";
import data from "../../../data/callouts.json";
import cls from "classnames";

interface Props {}

const Callouts = ({}: Props) => {
	return (
		<>
			{data.map(({ id, image, title, description, buttonText, direction }) => (
				<Callout key={id} image={image} direction={direction} description={description} />
			))}
		</>
	);
};

const Callout: FC<{ direction: string; image: string; description: string }> = ({ direction, image, description }) => {
	const callout__image = cls(styles.callout__image, {
		[styles["callout__image-right"]]: direction === "right",
		[styles["callout__image-left"]]: direction === "left"
	});

	const callout__details = cls(styles.callout__details, {
		[styles["callout__details-right"]]: direction === "right",
		[styles["callout__details-left"]]: direction === "left"
	});

	return (
		<div className={styles.root}>
			<div className={callout__image}>
				<Image src={image} alt="hero image" layout="fill" objectFit="cover" quality={100} className={styles.callout__image__img} />
			</div>
			<div className={callout__details}>
				<p>{description}</p>
			</div>
		</div>
	);
};

export default Callouts;
