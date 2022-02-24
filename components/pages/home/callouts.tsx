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
				<Callout key={id} image={image} title={title} description={description} buttonText={buttonText} direction={direction} />
			))}
		</>
	);
};

const Callout: FC<{ image: string; title: string; description: string; buttonText: string; direction: string }> = ({
	image,
	title,
	description,
	buttonText,
	direction
}) => {
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
				<Image src={image} alt="callout image" layout="fill" objectFit="cover" quality={100} className={styles.callout__image__img} priority />
			</div>
			<div className={callout__details}>
				<div className={styles.callout__details__wrapper}>
					<h2>{title}</h2>
					<p>{description}</p>
					<button>{buttonText}</button>
				</div>
			</div>
		</div>
	);
};

export default Callouts;
