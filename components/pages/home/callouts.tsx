import Image from "next/image";
import { FC } from "react";
import styles from "./callouts.module.scss";
import data from "../../../data/callouts.json";
import cls from "classnames";

const Callouts = () => {
	return (
		<>
			{data.map(({ id, image, title, description, buttonText, right }) => (
				<Callout key={id} image={image} title={title} description={description} buttonText={buttonText} right={right} />
			))}
		</>
	);
};

const Callout: FC<{ image: string; title: string; description: string; buttonText: string; right: boolean }> = ({
	image,
	title,
	description,
	buttonText,
	right
}) => {
	const callout__image = cls(styles.callout__image, {
		[styles["callout__image--right"]]: right
	});

	const callout__details = cls(styles.callout__details, {
		[styles["callout__details--right"]]: right
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
